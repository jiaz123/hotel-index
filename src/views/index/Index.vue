<template>
    <div class="box">
<!--        <van-loading type="spinner" color="#1989fa"></van-loading>-->
        <!--        头部-->
        <div class="header">
            <div class="banner">
                <van-swipe>
                    <swipe-item v-for="item in banner" :key="item.sid">
                        <router-link :to="{name:'detail',query:{sid:item.sid}}">
                            <img src="../../imgs/index/banner.png" :alt="item.sname" :title="item.sname">
                        </router-link>
                    </swipe-item>
                </van-swipe>
            </div>
            <div class="search">
                <div class="search1"><router-link to="/province">{{indexSearch.province}}</router-link> <van-icon name="arrow-down" /> <span class="search-text">景点 地址 关键词 </span> <van-icon name="location" />定位</div>
                <div class="search2"></div>
                <router-link to="/calendar" class="dateBox" tag="div">
                    <span class="date">{{ indexSearch.startTime }}</span>
                    <span class="week">{{ indexSearch.startDay }}</span>
                    <img src="../../assets/arrow.png" alt="">
                    <span class="date">{{ indexSearch.endTime }}</span>
                    <span class="week">{{ indexSearch.endDay }}</span>
                    <span class="during" style="font-size: 0.3rem">共{{Math.round((indexSearch.endTime-indexSearch.startTime)*100)}}晚</span>
                </router-link>
                <router-link to="/list"><div class="nowsearch">立即查找</div></router-link>
                <div class="search4" ><van-icon name="card" size="20"/><p>信用免押金 </p><van-icon name="audio"  size="20"/><p>24小时客服</p> <van-icon name="manager"  size="20"/><p>房源房东实名认证</p></div>
            </div>
        </div>
        <!--        优选-->
        <div class="pro" v-if="category.length">
            <div class="cname">
                <strong>
                    <span>{{category[0].cname.substring(0,2)}}</span>
                    <span class="cname-color">{{category[0].cname.substring(2,3)}}</span>
                    <span>{{category[0].cname.substring(3)}}</span>
                </strong>
            </div>
            <div class="cdesc">
                <span>{{category[0].cdesc}}</span>
            </div>
            <van-swipe :autoplay="3000">
                <swipe-item v-for="item in category[0].children" :key="item.sid">
                    <router-link :to="{name:'detail',query:{sid:item.sid}}">
                        <img :src="IMGURL + item.sthumb" :alt="item.sname" :title="item.sname" class="proimg">
                        <div class="imgword">
                            <div class="protitle">
                                {{item.sname}}
                            </div>
                            <div class="address hidden1">
                                <van-icon name="star"  color="yellow"/>
                                <van-icon name="star"  color="yellow"/>
                                <van-icon name="star"  color="yellow"/>
                                <van-icon name="star"  color="yellow"/>
                                <van-icon name="star"  color="yellow"/>
                            </div>
                            <div class="price">
                                <span>RMB</span><span>{{item.sprice}}</span>
                            </div>
                            <div class="city">
                                {{item.scity}}·{{item.sarea}}
                            </div>
                        </div>
                    </router-link>
                </swipe-item>
            </van-swipe>
        </div>

        <!--        不得不睡-->
        <div class="sleep" v-if="category.length">
            <div class="cname">
                <strong>
                    <span>{{category[1].cname.substring(0,3)}}</span>
                    <span class="cname-color">{{category[1].cname.substring(3)}}</span>
                </strong>
            </div>
            <div class="cdesc">
                <span>{{category[1].cdesc}}</span>
            </div>
            <van-swipe :autoplay="3000">
                <swipe-item v-for="item in category[1].children" :key="item.sid">
                    <router-link :to="{name:'detail',query:{sid:item.sid}}">
                        <img :src="IMGURL + item.sthumb" :alt="item.sname" :title="item.sname" class="sleep-img">
                        <div class="sleep-show">
                            <div class="sleep-cname hidden1">
                                {{item.sname}}
                            </div>
                            <div class="sleep-cdesc hidden1">
                                {{item.sdesc}}
                            </div>
                            <div class="label-box" v-if="item.stag">
                                <div class="tag-tag label" v-for="(tag,index) in item.stag.split(/,|，/)" :key="index">
                                    {{tag}}
                                </div>
                            </div>
                        </div>
                    </router-link>
                </swipe-item>
            </van-swipe>
        </div>
        <!--        不得不说-->
        <div class="talk" v-if="category.length">
            <div class="cname">
                <strong>
                    <span>{{category[2].cname.substring(0,3)}}</span>
                    <span class="cname-color">{{category[2].cname.substring(3)}}</span>
                </strong>
            </div>
            <div class="cdesc">
                <span>{{category[2].cdesc}}</span>
            </div>
            <van-swipe :autoplay="3000">
                <swipe-item v-for="item in category[2].children" :key="item.sid">
                    <router-link :to="{name:'detail',query:{sid:item.sid}}">
                        <img :src="IMGURL + item.sthumb" :alt="item.sname" :title="item.sname" class="sleep-img">
                        <div class="sleep-show">
                            <div class="sleep-cname hidden1">
                                {{item.sname}}
                            </div>
                            <div class="sleep-cdesc hidden1">
                                {{item.sdesc}}
                            </div>
                            <div class="label-box" v-if="item.stag">
                                <div class="tag-tag label" v-for="(tag,index) in item.stag.split(/,|，/)" :key="index">
                                    {{tag}}
                                </div>
                            </div>
                        </div>
                    </router-link>
                </swipe-item>
            </van-swipe>
        </div>
        <!--        不得不看-->
        <div class="look" v-if="category.length">
            <div class="cname">
                <strong>
                    <span>{{category[3].cname.substring(0,3)}}</span>
                    <span class="cname-color">{{category[3].cname.substring(3)}}</span>
                </strong>
            </div>
            <div class="cdesc">
                <span>{{category[3].cdesc}}</span>
            </div>
            <div class="look-show">
                <div class="look-item" v-for="item in category[3].children" :key="item.sid">
                    <router-link :to="{name:'detail',query:{sid:item.sid}}">
                        <div class="look-img">
                            <img :src="IMGURL+item.sthumb" alt="">
                        </div>
                        <div class="look-name"><span>{{item.sname}}</span></div>
                        <div class="look-address"><span>{{item.scity}} {{item.sarea}}</span></div>
                        <div class="look-score">
                            <van-icon name="star" />
                            <van-icon name="star" />
                            <van-icon name="star" />
                            <van-icon name="star" />
                            <van-icon name="star" color="#fefefe"/>
                        </div>
                        <div class="look-price"><span>{{item.sprice}}</span></div>
                    </router-link>
                </div>
            </div>
        </div>
        <tabbar></tabbar>
    </div>

</template>

<script>
    import {IMGURL} from "../../lib/base";
    import {apiIndex} from '../../http/api'
    // eslint-disable-next-line no-unused-vars
    import {Loading , SwipeItem, Swipe,Icon} from 'vant'
    import 'vant/lib/loading/style'
    import 'vant/lib/swipe/style'
    import 'vant/lib/swipe-item/style'
    import 'u-reset.css'
    import tabbar from "../../components/tab/tabbar";

    export default {
        name: "Index",
        data(){
            return {
                IMGURL,
                banner:[],
                category:[]
            }
        },
        components:{
            // VanLoading: Loading,
            VanSwipe:Swipe,
            SwipeItem,
            tabbar,
            VanIcon:Icon
        },
        computed:{
            indexSearch(){
                return this.$store.state.indexSearch;
            }
        },
        methods:{
            initSearch(){
                this.$store.dispatch('setTime');
                this.$store.dispatch('setProvince','山西');
            },
            initData(){
                apiIndex().then(res=>{
                    let banner = res.data.banner
                    banner = banner.map(ele=>{
                        ele.sthumb=IMGURL+ele.sthumb
                        return ele
                    })
                    this.banner= banner;
                    this.category=res.data.category
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        mounted() {
            this.initData()
        }
    }
</script>
<style>
    html{
        font-size: 13.333333vw;
    }
</style>

<style scoped>
    .header{
        width: 100%;
        height: 8.35rem;
        /*background: pink;*/
        position: relative;
    }

    .banner{
        width:100%;
        height: 5.79rem;
    }
    .banner img{
        width: 100%;
        height: 5.79rem;
    }

    .search{
        width: 6.4rem;
        height: 4rem;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0.55rem;
        right: 0.55rem;
        box-shadow: 5px 5px rgba(0,0,0,0.1);
    }
    .search1{
        margin: 0.2rem auto;
        color: #EB666B;
        text-align: center;
    }
    .search1 a{
        color: #EB666B;
    }
    .search1 img{
        width: 0.3rem;
        height: 0.3rem;
    }
    .search-text{
        font-size: small;
        color: #999999;
    }
    .search2{
        margin: 0.2rem auto;
        height: 0.05rem;
        width: 5rem;
        background:#999999;
    }
    .dateBox{
        width: 5.4rem;
        height: 0.8rem;
        margin: 0 auto;
    }
    .dateBox .date {
        width: 0.85rem;
        height: 0.37rem;
        font-size: 0.42rem;
        line-height: 0.37rem;
        color: #000000;
        opacity: 0.9;
        position: relative;
        top: 0.2rem;
    }
    .dateBox .week{
        width: 0.49rem;
        height: 0.18rem;
        font-size: 0.26rem;
        line-height: 0.04rem;
        color: #f8606a;
        opacity: 0.9;
        position: relative;
        top: 0.2rem;
        right: 0.1rem;
        margin-left: 0.2rem;
    }
    .dateBox img{
        position: relative;
        top: 0.2rem;
        margin-left: 0.2rem;
        right: 0.1rem;
    }
    .dateBox .during{
        font-size: 0.1rem;
        opacity: 0.6;
        position: relative;
        top: 0.2rem;
    }
    .search4{
        margin: 0.4rem auto 0.2rem;
        text-align: center;
        font-size: small;
        display: flex;
        justify-content: space-between;
    }
    .search4 img{
        width: 0.3rem;
        height: 0.3rem;
    }
    .search4 .van-icon{
        float: left;
    }
    .search4 p{
        line-height: 20px;
        margin: 0 0.05rem;
        float:left;
    }

    .nowsearch{
        margin: 0.2rem auto;
        text-align: center;
        vertical-align: center;
        line-height: 0.7rem;
        height: 0.7rem;
        width: 5rem;
        border-radius: 2px;
        color: #f7f7f7;
        border:1px solid #3e3e3e;
        background: #EB666B;
    }
    .van-icon{
        color: #EB666B;
    }

    /*    优选pro*/
    .pro{
        width: 6.4rem;
        height: 7.2rem;
        /*background: darkseagreen;*/
        padding-top: 0.8rem;
        margin: 0 auto;
    }

    .cname{
        height: 0.52rem;
        font-size: 0.36rem;
        color: rgba(0,0,0,0.9);

    }
    .cname-color{
        color: #ed757a;
    }

    .cdesc{
        height: 0.74rem;
        line-height: 0.26rem;
        font-size: 0.26rem;
        color: rgba(0,0,0,0.7);
    }

    .imgword{
        width: 90%;
        height: 1.4rem;
        position: relative;
        bottom: 1.4rem;
        margin: 0 auto;
    }
    .imgword .protitle{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.3rem;
        color: #ffffff;
        font-weight: bolder;
    }
    .imgword > img{
        width: 0.3rem !important;
        height: auto !important;
    }
    .imgword .address{
        font-size: 0.3rem;
        color: #ffffff;
        width: 70%;
        float: left;
    }
    .imgword .price{
        font-size: 0.4rem;
        color: #ffffff;
        float: right;
        font-weight: bold;
    }
    .imgword .price span:first-child{
        font-size: 0.2rem;
    }
    .imgword .city{
        height: 0.1rem;
        color: #ffffff;
    }
    .proimg{
        width: 100%;
        height: 4.05rem;
    }
    .tag-tag{
        float: left;
    }
    .pro-show-one img{
        width: 5.9rem;
        height: 4.05rem;
    }

    .pro-show-two{
        width: 6.15rem;
        height: 3.57rem;
        position: absolute;
        top: 0.48rem;
        border-radius: 0.06rem;

        background: #f19194;
        z-index: 2;
    }
    .pro-show-three{
        width: 6.4rem;
        height: 3.09rem;
        position: absolute;
        border-radius: 0.06rem;
        top: 0.96rem;
        background: #f9d1d2;
        z-index:1;
    }

    .more{
        margin: 0 auto;
        margin-top: 0.45rem;
        width: 3.6rem;
        height: 0.64rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f8f8f8;
    }

    .more-point{

        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        background: #f19194;
        float: left;

    }

    .more:before{
        content: '';
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        margin-right: 0.16rem;
        background: #f9d1d2;
        display: inline-block;

    }
    .more:after{
        content: '';
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        margin-left: 0.16rem;
        background: #f9d1d2;
        display: inline-block;

    }

    /*    sleep不得不睡*/
    .sleep{
        width: 6.4rem;
        height: 7.8rem;
        margin-top: 0.8rem;
        /*background: #f9d1d2;*/
        margin: 0 auto;
    }

    .sleep-show{
        width: 5.4rem;
        background: #f8f8f8;
        margin-right: 0;
        vertical-align: center;
    }

    .sleep-img{
        width: 5.4rem;
        height: 2.3rem;
    }
    .sleep-img img{
        width: 100%;
        height: 2.3rem;
    }

    .sleep-cname{
        margin-left: 0.48rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.26rem;
        opacity: 0.7;

    }

    .sleep-cdesc{
        margin-left: 0.48rem;
        margin-right:0.48rem;
        width: 4.34rem;
        height: 0.82rem;
        font-size: 0.2rem;
        text-align: left;
        line-height: 0.3rem;
        letter-spacing: 0.02rem;
        opacity: 0.4;
    }

    .label-box{
        margin-left: 0.48rem;
    }

    .label{
        height: 0.38rem;
        margin-right: 0.22rem;
        border-radius: 0.1rem 0.19rem 0.19rem 0.1rem;
        text-align: center;
        justify-content: center;
        font-size: 0.18rem;
        background: aquamarine;
        float: left;
        line-height: 0.38rem;
    }


    /*    不得不说*/
    .talk{
        width: 6.4rem;
        height: 6rem;
        background: #f8f8f8;
        padding-top: 0.64rem;
        margin: 0 auto;
    }
    .talk-show{
        width: 6.4rem;
        height: 2.88rem;
        margin: 0 auto;
    }
    .talk-left{
        width: 2.88rem;
        height: 2.88rem;
        border-radius: 0.05px;
        background: #f9d1d2;
        float: left;
    }

    /*    不得不看*/
    .look{
        width: 6.4rem;
        height: 11.98rem;
        padding-top: 0.64rem;
        margin: 0 auto;
        background: aquamarine;
    }
    .look-show{
        width: 6.4rem;
        height: 9.4rem;
        background: #f9d1d2;
    }

    .look-item{
        width: 50%;
        margin: 0 auto;
        float: left;
    }

    .look-item .look-img{
        width: 100%;
        height: 2.28rem;
        background: white;
    }

    .look-img img{
        width: 100%;
        height: 2.28rem;
    }
    .look-item .look-name{
        height: 0.5rem;
        font-size: 0.26rem;
        padding-top: 0.24rem;
        line-height: 0.26rem;
    }

    .look-item .look-address{
        height: 0.38rem;
        padding-top: 0.2rem;
        font-size: 0.18rem;
        line-height: 0.18rem;
    }
    .look-item .look-score{
        height: 0.4rem;
        padding-top: 0.16rem;
    }
    .look-item .look-score i{
        color: #fff770;
    }

    .look-item .look-price{
        height: 0.38rem;
        padding-top: 0.14rem;
        font-size: 0.24rem;
        line-height: 0.24rem;

        color: #fe5e5a;
    }
    .look-item .look-price:before{
        content: 'RMB   ';
        font-size: 0.14rem;
        color: #fe5e5a;
        height: 50%;
    }

    .look-item .look-price:after{
        content: '   每晚';
        color: #000000;
        font-size: 0.18rem;
        height: 60%;
    }
</style>