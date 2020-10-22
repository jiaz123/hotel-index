<template>
    <div v-if="person">
        <!-- // 身份信息 -->
        <div class="banner">
            <img :src="person.avatar" alt="">
            <div class="username">
                {{person.nickname}}
            </div>
        </div>
        <!-- // VIP信息 -->
        <div class="vip">
            <p class="vip1">V 会员中心</p> <p class="vip2">几品小主 <van-icon name="arrow" /></p>
        </div>
        <!-- 订单 -->
        <div class="order">
            <div id="myorder">
                <van-cell :to="{name:'orderslist',query:{type:0}}" title="我的订单" value="查看全部订单" is-link></van-cell>
            </div>
            <div id="line">

            </div>
            <div class="info">
                <router-link :to="{name:'orderslist',query:{type:3}}"><div class="infodetail"><van-icon size="30" name="orders-o" /><div class="infotext">已完成</div></div></router-link>
                <router-link :to="{name:'orderslist',query:{type:1}}"><div class="infodetail"><van-icon size="30" name="balance-pay" /><div class="infotext">待付款</div></div></router-link>
                <router-link :to="{name:'orderslist',query:{type:2}}"><div class="infodetail"><van-icon size="30" name="wap-home" /><div class="infotext">待入住</div></div></router-link>
                <router-link to="/"><div class="infodetail"><van-icon size="30" name="credit-pay" /><div class="infotext">退 款</div></div></router-link>
            </div>
        </div>
        <!-- 详情 -->
        <div class="detail">
            <van-cell title-class="dtitle" icon="stop-circle-o" title="红包" is-link></van-cell>
            <van-cell title-class="dtitle"  icon="stop-circle-o" title="设置" is-link></van-cell>
            <van-cell title-class="dtitle"  icon="stop-circle-o" title="内容管理" is-link></van-cell>
            <van-cell to="/collection" title-class="dtitle"  icon="stop-circle-o" title="我的收藏" is-link></van-cell>
            <van-cell title-class="dtitle"  icon="stop-circle-o" title="积分商城" is-link></van-cell>
            <van-cell title-class="dtitle"  icon="stop-circle-o" title="帮助与反馈" is-link></van-cell>
        </div>
        <!-- 成为房东 -->
        <a href="">
            <div class="douser"><p>成为房东</p></div>
        </a>
        <tabbar :index="3"></tabbar>
    </div>
</template>

<script>
    import { Icon,Cell } from 'vant';
    import 'vant/lib/icon/style'
    import 'vant/lib/cell/style'
    import tabbar from "../../components/tab/tabbar";
    import {apiPerson} from "../../http/api";
    import {Toast} from 'vant'
    import {IMGURL} from "../../lib/base";
    export default {
        name: "My",
        components:{
            tabbar,
            vanIcon:Icon,
            vanCell:Cell
        },
        data(){
            return{
                person:null
            }
        },
        methods:{
            initPerson(){
                apiPerson().then(res=>{
                    if (res.data){
                        this.person=res.data
                        this.person.avatar=IMGURL+this.person.avatar
                    }else {
                        Toast(res.msg)
                    }
                }).catch(error=>{
                    error
                })
            }
        },
        mounted() {
            this.initPerson()
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }
    *{margin:0;padding:0}

    li{list-style:none}

    img{vertical-align:top;border:none}
    html{
        font-family: "微软雅黑";
    }
    body {
        background: #ffffff;
    }
    /* 身份信息 */
    .banner img{
        width: 2rem;
        height: 2rem;
        display: block;
        margin:0.625rem auto;
    }
    .username{
        text-align: center;
        margin:0 auto;
    }
    /* VIP信息 */
    .vip{
        height: 0.8rem;
        background: #3e3e3e;
        width: 6.4rem;
        margin: 0 auto;
        border-radius:0.25rem 0.25rem 0 0 ;
    }
    .vip p:nth-child(1){
        float: left;
        -webkit-text-fill-color:#f8bb7f ;
        line-height: 0.8rem;
    }
    .vip p:nth-child(2){
        float: right;
        -webkit-text-fill-color: #ffffff;
        line-height: 0.8rem;
    }
    /* 订单 */
    .order{
        width:6.4rem;
        height: 3rem;
        background: #ffffff;
        margin: 0 auto;
        margin-top: 0.3rem;
        border-radius:0.3125rem 0.3125rem 0 0 ;
    }
    #myorder{
        height: 0.5rem;
    }
    #line{
        height: 0.05rem;
        width: 6.4rem;
        background: #f7f7f7;
        margin: 0 auto;
        margin-top: 0.1rem;
    }
    .info{
        height: 2rem;
        width: 6.4rem;
        vertical-align: middle;
        margin-top: 0.5rem;
    }
    .infodetail{
         width: 1rem;
         height: 1rem;
         float: left;
         margin: 0 0.3rem 0.1rem;
         border-radius: 50%;
         background: #f9d1d2;
     }
    .infodetail .van-icon{
        color: #EB666B;
        display: block;
        text-align: center;
        position: relative;
        line-height: 1rem;
    }

    .infotext{
        /*margin-top:/*/
        float: left;
    }
    .infotext div{
        float: left;
        width: 0.8rem;
        text-align: center;
        margin: 0 0.5rem;
    }
    /* 详情 */
    .detail{
        margin: 0 auto;
        width: 6.4rem;
    }
    .dtitle{
        font-size: revert;
    }
    /* 成为房东 */
    .douser{
        margin: 0.2rem auto;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 6.4rem;
        border-radius: 0.1rem;
        background: #eb666b;
        text-align: center;
        -webkit-text-fill-color: #ffffff;
    }
</style>