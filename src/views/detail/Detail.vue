<template>
    <div>
        <div v-if="homestay">
            <van-swipe :autoplay="3000" >
                <van-swipe-item v-for="(item,index) in homestay.sbanner" :key="index">
                    <img :src="item"  :alt="homestay.sname"  :title="homestay.sname">
                </van-swipe-item>
            </van-swipe>
            <div>{{homestay.sname}}</div>
        </div>
        <div>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
                <van-goods-action-icon icon="like-o" @click="handleCollection" :class="{active:isCollection}" text="收藏" />
                <van-goods-action-button type="danger" text="立即预约" @click="handleOrders"/>
            </van-goods-action>
        </div>
    </div>
</template>

<script>
    import {apiDetail} from "../../http/api";
    import {IMGURL} from "../../lib/base";
    import {Swipe, SwipeItem, GoodsAction, GoodsActionButton, GoodsActionIcon, Toast} from 'vant';
    import 'vant/lib/swipe/style';
    import 'vant/lib/swipe-item/style'
    import 'vant/lib/goods-action/style'
    import 'vant/lib/goods-action-button/style'
    import 'vant/lib/goods-action-icon/style'

    export default {
        name: "Detail",
        data(){
            return{
                homestay:null,
                recommend:[],
                sid:0
            }
        },
        components:{
          VanSwipe:Swipe,
          'van-swipe-item':SwipeItem,
            VanGoodsAction:GoodsAction,
            VanGoodsActionButton:GoodsActionButton,
            VanGoodsActionIcon:GoodsActionIcon
        },
        computed:{
            // eslint-disable-next-line vue/return-in-computed-property
          isCollection(){
              let id=this.$route.query.sid
              return this.$store.getters.isCollection(id);
          }
        },
        getters:{

        },
        methods:{
            initHomestay(sid){
                apiDetail(sid).then(res=>{
                    let homestay = res.data.homestay
                    homestay.sbanner = homestay.sbanner.map(ele=>{
                        ele = IMGURL + ele;
                        return ele;
                    })
                    homestay.stag = homestay.stag.split(/,|，/);
                    this.homestay = homestay;
                    this.recommend = res.data.recommend
                }).catch(error=>{
                    console.log(error);
                })
            },
            handleCollection(){
                if (this.$store.state.token){
                    this.$store.commit('toggleCollection',this.$route.query.sid)
                }
            },
            handleOrders(){
                if (!this.$store.state.token){
                    Toast('请登录');
                    this.$router.push({name:'login',query:{redirect:'detail',params:{sid:this.sid}}})
                }else {
                    let {sid,sthumb,sname,sdesc,sprice} = this.homestay
                    this.$router.push({name:'orders',query:{sid,homestay: JSON.stringify({sid,sthumb,sname,sdesc,sprice})}})
                }
            }
        },
        mounted() {
            let sid = this.$route.query.sid
            this.initHomestay(sid)
        },
        watch:{
            '$route.query.sid'(newv){
                console.log(newv);
            }
        }
    }
</script>
<style>
    .van-goods-action-icon.active{
        color: #EB666B;
    }
    .van-goods-action-icon.active .van-icon-star-o{
        color: #EB666B;
    }
</style>
<style scoped>
    @import "../../style/detail.css";
</style>