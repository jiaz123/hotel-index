import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {apilogin} from "../http/api";
import router from "../router";

Vue.use(Vuex)

const store = new Vuex.Store({
    // 唯一的数据来源  state => data
    state:{
        indexSearch:{
            province:'',
            address:'',
            startTime:'',
            endTime:'',
            startDay:'',
            endDay:''
        },
        token:'',
        collection:[]
    },
    // getters => computed
    getters:{
        isCollection(state){
            return function (sid) {
                let flag=false;
                if (state.collection.length){
                    flag = state.collection.some(ele=>ele == sid)
                }
                return flag
            }
        }
    },
    // 修改state的唯一方法  mutations
    mutations:{
        setTime(state,payload){
            let weekArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            let {start , end , startDay, endDay} = payload;
            let date = new Date();
            let startTime = start? start : date.getMonth()+1+'.'+ date.getDate();
            let endTime = end? end : date.getMonth()+1+'.'+ date.getDate() + 2;
            startDay = startDay=== undefined ? date.getDay() : startDay;
            endDay = endDay=== undefined ? startDay+2 : endDay;
            state.indexSearch.startDay = weekArr[startDay];
            state.indexSearch.endDay = weekArr[endDay];
            state.indexSearch.startTime = startTime;
            state.indexSearch.endTime = endTime;
        },
        setProvince(state,payload){
            state.indexSearch.province=payload;
        },
        setToken(state,payload){
            state.token=payload
        },
        setCollection(state,payload){
            state.collection=payload
        },
        toggleCollection(state,sid){
            let flag = state.collection.indexOf(sid)
            if(flag > -1){
                state.collection.splice(flag , 1)
            }else {
                state.collection.push(sid)
            }
        }
    },
    // actions 异步方法 提交mutations
    actions:{
        handlerLogin({commit},payload){
            let redirect = payload.redirect;
            let query = payload.query
            delete payload.redirect
            delete payload.query
            apilogin(payload).then(res=>{
                commit('setToken',res.token);
                if (res.collection){
                    let collection=res.collection.split(',').map(ele=>ele*1)
                    commit('setCollection',collection)
                }
                router.replace({name:redirect,query:query})
            }).catch(error=>{
                error
            })
        }
    },
    plugins:[createPersistedState()],
    modules:{

    }
})

export default store;