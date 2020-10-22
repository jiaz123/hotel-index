<template>
    <div class="bottom">
        <router-link to="/">
            <div class="icon" :class="[index === 1?'active':'']">
                <van-icon size="30" name="wap-home-o" />
                <div>首页</div>
            </div>
        </router-link>
        <router-link to="/list">
            <div class="icon"  :class="[index === 2?'active':'']">
                <van-icon  size="30" name="eye-o" />
                <div>视界</div>
            </div>
        </router-link>
        <router-link to="/my">
            <div class="icon" :class="[index == 3?'active':'']">
                <van-icon  size="30" name="contact" />
                <div>我的</div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {Icon} from 'vant'
    export default {
        name: "tabbar",
        props:{
            index:{
                type:Number,
                default:1
            }
        },
        components:{
            vanIcon:Icon
        }
    }
</script>

<style scoped>
    .bottom{
        width: 100%;
        height: 1.5rem;
        display:flex;
        position:fixed;
        z-index :100;
        left :0;
        right :0;
        bottom:0;
        background-color:#fff;
    }
    .bottom img{
        width: 0.38rem;
        height: 0.38rem;
    }
    .bottom a{
        width: 33.3%
    }
    .icon{
        width: 33%;
        height: 100%;
        margin: 0.2rem auto;
        text-align: center;
        -webkit-text-fill-color: #f9d1d2;
    }
    .active{
        -webkit-text-fill-color: #EB666B;
    }
</style>