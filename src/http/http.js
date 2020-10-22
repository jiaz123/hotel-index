import axios from "axios";
import {URL} from "../lib/base";
import {Toast} from "vant";
import store from "../store";
import router from "../router";

const instance =axios.create({
    baseURL:URL,
    timeout:5000
})

// 请求拦截
instance.interceptors.request.use(function (config) {
    let token=store.state.token;
    if (token){
        config.headers=Object.assign(config.headers,{token,'Retry-after':3600})
    }
    return config;
}, function (error) {
    return Promise.reject(error)
});

// 响应拦截
instance.interceptors.response.use(function (response) {
    if (response.status === 200){
        return response.data;
    }
}, function (error) {
    let message= ''
    if (error && error.response){
        switch (error.response.status) {
            case  400 :
                message= "服务器无法理解请求格式";
                break;
            case  401 :
                message= "禁止访问";
                router.push({name:'login',query:{redirect:'my'}})
                break;
            case  403 :
                message= "找不到如何与url相匹配的资源";
                break;
            case  404 :
                message= "服务器无法理解请求格式";
                break;
            case  500 :
                message= "服务器错误";
                break;
            case  503 :
                message= " 服务器端暂时无法处理请求";
                break;
        }

    }
    Toast({
        type:"fail",
        message
    })
    return Promise.reject(error)
});


export default instance;