<template>
    <div>
        <header v-if="homestay"><router-link :to="{name:'detail',query:{sid:homestay.sid}}"><van-icon name="arrow-left" /></router-link> <h3>订单填写</h3></header>
        <div v-if="homestay">
            <van-card
                    :price="homestay.sprice"
                    :desc="homestay.sdesc"
                    :title="homestay.sname"
                    :thumb="homestay.sthumb"
            >
            </van-card>
        </div>
        <div class="header"><van-tag color="#eb666b" text-color="#ffffff">不可取消</van-tag> <span>距离入住日期较近 不可取消</span> <van-icon name="arrow" /></div>
        <div class="date">
            <van-cell title="入离日期" is-link value="修改日期" to="ordersDate" />
        </div>
        <div>
                <van-row>
                    <van-col span="8">{{orders.enter_time}}</van-col>
                    <van-col span="8"><img src="../../assets/arrow.png" alt=""></van-col>
                    <van-col span="8">{{orders.leave_time}}</van-col>
                </van-row>
        </div>
        <van-cell title="入住人数">
            <template #right-icon>
                <van-stepper  theme="round" button-size="22" min="1" max="5" disable-input />
            </template>
        </van-cell>
        <van-cell title="住客信息" value="添加/编辑" />
        <div class="info">
            <van-cell title="王小明" label="身份证  142727199*******13"></van-cell>
        </div>
        <van-cell title="联系方式 +86" value="157****9262"></van-cell>
        <van-cell v-if="homestay" title="房费" :value="homestay.sprice"></van-cell>
        <van-cell center title="平台优惠 学生特价" value="立减 50.00">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title="已享受最大优惠组合 共省￥50.00" value="">本单需付￥{{orders.price}}</van-cell>
        <van-cell title="退订政策" value="入住前一天12:00前退订，可获得100%退款 之后退款不退款"></van-cell>
        <van-cell title="入离时间" value="----14:00之后可入住---- ----12:00之前需退房----"></van-cell>
        <van-cell title="提供发票" value="不支持开发票 如果需要请与房东协商"></van-cell>
        <van-row type="flex" justify="center" align="center">
            <van-col span="8"><van-icon size="30" name="chat-o" /></van-col>
            <van-col span="8" v-if="homestay">￥{{orders.price}}</van-col>
            <van-col span="8"><van-button type="danger" @click="handleOrders">提交订单</van-button></van-col>
        </van-row>
    </div>
</template>

<script>
    import store from "../../store/store";
    import {Icon, Card, Stepper, Button, Tag, Cell, Row, Col, Toast} from 'vant';
    import 'vant/lib/icon/style'
    import 'vant/lib/card/style'
    import 'vant/lib/tag/style'
    import 'vant/lib/stepper/style'
    import 'vant/lib/button/style'
    import 'vant/lib/row/style'
    import 'vant/lib/col/style'
    import 'vant/lib/cell/style'
    import {IMGURL} from "../../lib/base";
    import {apiOrders} from "../../http/api";
    export default {
        name: "Orders",
        components:{
            vanIcon:Icon,
            vanCard:Card,
            vanStepper:Stepper,
            vanButton:Button,
            vanTag:Tag,
            vanCell:Cell,
            vanRow:Row,
            vanCol:Col
        },
        data(){
            return {
                homestay:null,
                orders:{
                    sid:'',
                    enter_time:store.enter_time,
                    leave_time:store.leave_time,
                    user_number:1,
                    user_info:'jz',
                    phone:'15735999262',
                    price:''
                },
                show:false,
                message:''
            }
        },
        computed:{
            indexSearch(){
                return this.$store.state.indexSearch;
            }
        },
        methods:{
            handleOrders(){
                apiOrders(this.orders).then(res=>{
                    this.show=true
                    Toast(res.msg);
                    if (res.code == 200){
                        this.$router.push({name:'pay',query:{'oid':res.oid}})
                    }
                }).catch(error=>{
                    error;
                })
            }
        },
        mounted() {
           let {sid , homestay}=this.$route.query
            this.orders.sid = sid
            this.homestay=JSON.parse(homestay)
            this.homestay.sthumb=IMGURL+this.homestay.sthumb
            this.orders.price = this.homestay.sprice-50
        }
    }
</script>

<style scoped>
    header{
        width: 6.4rem;
        height: 1rem;
    }
    header .van-icon{
        float: left;
    }
    header h3{
        margin-top: 0.26rem;
        width: 5.5rem;
        float: left;
        text-align: center;
    }
    .van-icon.van-icon-arrow-left{
        color: #EB666B;
        margin-left: 0.55rem;
        margin-top: 0.4rem;
    }

    .van-card{
        width: 6.4rem;
        margin: 0 auto;
    }
    .header{
        width: 6.4rem;
        margin: 0 auto;
        background: #fafafa;
        height: 0.5rem;
    }
    .header span{
        font-size: small;
        color: #a4a4a4;
    }
    .header .van-icon{
        color: #EB666B;
        float: right;
    }
    .date{
        width: 6.4rem;
        margin: 0 auto;
    }
    .van-row{
        width: 6.4rem;
        margin: 0 auto;
    }
    .van-col.van-col--8{
        text-align: center;
    }
    .van-cell{
        width: 6.4rem;
        margin: 0 auto;
    }
    .info{
        width: 6.4rem;
        margin: 0 auto;
    }
    .info.van-cell{
        width: 5.8rem;
        margin: 0 auto;
    }


</style>