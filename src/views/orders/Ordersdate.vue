<template>
    <div>
        <van-calendar v-model="show" :max-range="3" type="range" @confirm="onConfirm"></van-calendar>
    </div>
</template>

<script>
    import store from "../../store/store";
    import {Calendar} from 'vant'
    import 'vant/lib/calendar/style'
    export default {
        name: "Ordersdate",
        data(){
            return{
                show:true
            }
        },
        methods:{
            formateDate(date){
                let year = date.getFullYear()
                let month = date.getMonth()+1;
                let date1 = date.getDate()
                return `${year}/${month}/${date1}`
            },
            onConfirm(date){
                let [startTime,endTime] = date;
                store.enter_time = this.formateDate(startTime);
                store.leave_time = this.formateDate(endTime);
                this.$router.back()
            }
        },
        components:{
            'van-calendar':Calendar
        }
    }
</script>

<style scoped>

</style>