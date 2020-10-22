<template>
    <div class="body">
        <header><router-link to="/my"><van-icon name="arrow-left" /></router-link> <h3>订单列表</h3></header>
        <div class="order-buttons">
            <ul>
                <li :class="{tap:item.field == search.field}" v-for="(item,index) in orderstype" :key="index" @click="changeOrdertype(item.field)">
                    <div><span>{{item.text}}</span></div>
                </li>
            </ul>
        </div>
        <ul class="big-order" v-for="(item,index) in orderslist" :key="index">
            <li>
                <div class="info">
                    <img :src="item.sthumb" alt="">
                    <div style="position: relative;top: -0.7rem;color: white;padding: 0 0.2rem;height: 0.7rem;line-height: 0.7rem">
                        <div style="display: flex;justify-content: space-between">
                            <div>
                                <span class="fromdate">{{item.enter_time}}</span>
                                <van-icon name="arrow" />
                                <span class="todate">{{item.leave_time}}</span>
                            </div>
                            <span class="status">{{item.type}}</span>
                        </div>
                    </div>
                </div>

                <div class="name">
                    <span>{{item.sname}}</span>
                    <div>
                        <span style="font-size: 0.1rem;color: #eb666b">RMB</span>
                        <span>{{item.price}}</span>
                    </div>
                </div>
                <div class="buttons">
                    <button @click="ordersPay(item.oid)">立即付款</button>
                    <button style="margin-right: 0.2rem" @click="delelteOrders(item.oid)">取消订单</button>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import {apiDeleteOrders, apiOrderslist} from "../../http/api";
    import {Icon} from 'vant'
    import {IMGURL} from "../../lib/base";

    export default {
        name: "Orderslist",
        components:{
            vanIcon:Icon
        },
        data(){
            return {
                orderstype:[
                    {field:0,text:'全部'},
                    {field:3,text:'已完成'},
                    {field:2,text:'待入住'},
                    {field:1,text:'待付款'},
                    {field:4,text:'退款'},
                ],
                statuslist:['','待付款','待入住','已完成','退款'],
                orders:[],
                paginate: {
                    page:1,
                    limit:5
                },
                search:{
                    field:1
                },
                IMGURL,
                orderslist:[]
            }
        },
        methods:{
            changeOrdertype(field){
                this.search.field = field
                this.orderslist = this.orders.filter(ele=>{
                    if (field === 0){
                        return true
                    }else {
                        return  ele.status === field
                    }
                })
                this.$router.push({name:'orderslist',query:{'type':field}})
            },
            initOrders(){
                let params = Object.assign({},this.paginate,this.search)
                apiOrderslist(params).then(res=>{
                    this.orders=res.data;
                    this.orders.map(ele=>{
                        ele.sthumb=IMGURL+ele.sthumb;
                        ele.type = this.statuslist[ele.status]
                        return ele
                    })
                    this.orderslist=this.orders.filter(ele=>{
                        if (this.search.field == 0){
                            return true
                        }else {
                            return ele.status == this.search.field
                        }
                    })
                }).catch(error=>{
                    error
                })
            },
            ordersPay(oid){
                this.$router.push({name:'pay',query:{'oid':oid}})
            },
            delelteOrders(oid){
                apiDeleteOrders(oid).then(res=>{
                    console.log(res);
                }).catch(error=>{
                    error
                })
            }
        },
        mounted() {
            let type = this.$route.query.type
            this.search.field=type
            this.initOrders()
        }
    }
</script>

<style scoped>
@import "../../style/orderslist.css";
</style>