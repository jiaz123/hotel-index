<template>
    <div class="list-box">
        <ul class="nav">
            <li v-for="(item,index) in orderArr" :key="index" :class="{active:order.field == item.field}" @click="handlerOrdertype(item.field)">{{item.text}}<i :class="['iconfont',item.icon]"></i></li>
        </ul>
        <div class="list">
            <van-pull-refresh v-model="isPullrefresh" @refresh="handlerPullrefresh">
                <van-list v-model="isUpper" :finished="upperFinished" :immediate-check="false" @load="handlerUpper">
                    <div class="mustsee-item" v-for="item in homestay" :key="item.sid">
                        <img :src="item.sthumb" alt="" class="mustsee-img">
                        <h2 class="hotelName">{{item.sname}}</h2>
                        <span style="color: #999999">{{item.sarea}}</span>
                        <span style="color: #f8606a">RMB</span>
                        <span style="" class="price">{{item.sprice}}</span>
                        <span>每晚</span>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <tabbar :index="2"></tabbar>
    </div>
</template>

<script>
    import  {PullRefresh, List, Toast} from 'vant';
    import 'vant/lib/pull-refresh/style'
    import 'vant/lib/list/style'
    import {apiList} from "../../http/api";
    import {IMGURL} from "../../lib/base";
    import tabbar from "../../components/tab/tabbar";

    export default {
        name: "List",
        components: {
            VanPullRefresh: PullRefresh,
            VanList: List,
            tabbar
        },
        data() {
            return {
                orderArr:[
                    {text:'综合',icon:"icon-xiala",field:"sid"},
                    {text:'位置',icon:"icon-xiala",field:"score"},
                    {text:'时间',icon:"icon-xiala",field:"ctime"},
                    {text:'价格',icon:"icon-xiala",field:"sprice"}
                ],
                isPullrefresh: false,
                isUpper: false,
                upperFinished: false,
                paginate: {
                    page: 0,
                    limit: 2
                },
                // 综合 sid , 位置score  时间 ctime 价格 sprice
                order: {
                    field: 'sid',
                    type: 'desc'
                },
                homestay: [],
                total: 0
            }
        },
        methods: {
            handlerPullrefresh() {
                this.upperFinished=false
                this.paginate.page = 0
                this.homestay=[]
                this.handlerUpper()
            },
            handlerUpper() {
                this.paginate.page++
                let obj = Object.assign({},this.paginate,this.order)
                apiList(obj).then(res => {
                    if (res.data){
                        !this.total &&(this.total = res.total);
                        let data = res.data.map(ele=>{
                            ele.sthumb = IMGURL+ele.sthumb
                            return ele
                        })
                        this.homestay = this.homestay.concat(data);
                        if (this.homestay.length>=this.total){
                            this.upperFinished=true
                        }
                    }else {
                        Toast({
                            'message':'暂无数据'
                        })
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            handlerOrdertype(field){
                this.order.field=field
                this.upperFinished=false
                this.paginate.page=0
                this.homestay=[]
                this.total=0
            }
        },
        mounted() {
            this.handlerUpper()
        }
    }
</script>
<style>
    html,body{

    }
</style>

<style scoped>
    @import url('../../style/list.css');
</style>