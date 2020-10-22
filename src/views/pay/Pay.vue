<template>
    <div>
        <header><router-link to="/"><van-icon name="arrow-left" /></router-link> <h3>订单支付</h3></header>
        <div class="count">
            <div class="counttitle">剩余支付时间</div>
            <van-count-down :time="time">
                <template #default="timeData">
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
            <div class="counttitle">待支付 158.00</div>
        </div>
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell title="支付宝支付" clickable @click="radio = '1'">
                    <template #right-icon>
                        <van-radio name="1" />
                    </template>
                </van-cell>
                <van-cell title="微信支付" clickable @click="radio = '2'">
                    <template #right-icon>
                        <van-radio name="2" />
                    </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <div class="nowpay" @click="handlePay">立即付款</div>
    </div>

</template>

<script>
    import {Icon, CountDown, Cell, CellGroup, RadioGroup, Radio, Toast} from 'vant'
    import 'vant/lib/icon/style'
    import 'vant/lib/cell/style'
    import 'vant/lib/count-down/style'
    import {apiUpdateOrders} from "../../http/api";

    export default {
        name: "Pay",
        data(){
            return{
                radio: '1',
                time:30*60*1000
            }
        },
        components:{
            vanIcon:Icon,
            vanCell:Cell,
            vanCountDown:CountDown,
            vanCellGroup :CellGroup ,
            vanRadioGroup:RadioGroup,
            vanRadio:Radio
        },
        methods:{
            handlePay(){
                let oid = this.$route.query.oid
                apiUpdateOrders(oid).then(res=>{
                    if (res.code == 200){
                        Toast(res.msg)
                        this.$router.push({name:'orderslist',query:{type:2}})
                    }else {
                        Toast(res.msg)
                        this.$router.push({name:'orderslist',query:{type:2}})
                    }
                }).catch(error=>{
                    error
                })
            }
        },
        mounted() {

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
    .count{
        width: 6.4rem;
        background: #ffffff;
        margin: 0 auto;
    }
    .counttitle
    {
        text-align: center;
    }
    .van-count-down{
        margin: 0.5rem;
        height: 1rem;
        display: flex;
        justify-content: center;
    }
    .colon {
        display: inline-block;
        margin: 0 4px;
        color: #2c3742;
        font-size: larger;
        line-height: 1rem;
    }
    .block {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        color: #fdfdfd;
        font-size: 0.5rem;
        text-align: center;
        line-height: 1rem;
        background-color: #364350;
    }
    .nowpay{
        margin: 4rem auto 0;
        bottom: 1rem;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 6.4rem;
        border-radius: 0.1rem;
        background: #eb666b;
        text-align: center;
        -webkit-text-fill-color: #ffffff;
    }
</style>