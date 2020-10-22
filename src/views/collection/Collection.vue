<template>
    <div v-if="collection.length">
        <div v-for="(item,index) in collection" :key="index">
            <router-link :to="{name:'detail',query:{sid:item.sid}}">
                <van-card
                        :price="item.sprice"
                        :desc="item.sdesc"
                        :title="item.sname"
                        :thumb="item.sthumb"
                >
                    <template #tags>
                        <van-tag plain type="danger" v-for="(stag , index) in item.stag" :key="index">{{stag}}</van-tag>
                    </template>
                </van-card>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {apiCollection} from "../../http/api";
    import {IMGURL} from "../../lib/base";
    import {Card , Tag} from 'vant';
    import 'vant/lib/card/style';
    import 'vant/lib/tag/style';

    export default {
        name: "Collection",
        data(){
            return {
                collection:[],
                IMGURL
            }
        },
        components:{
            vanCard:Card,
            vanTag:Tag
        },
        methods:{
            initCollection(){
                apiCollection().then(res=>{
                    this.collection=res.data;
                    this.collection=this.collection.map(ele=>{
                        ele.sthumb=IMGURL+ele.sthumb
                        ele.stag=ele.stag.split(/,|，/)
                        return ele
                    })
                }).catch(error=>{
                    error
                })
            }
        },
        mounted() {
            this.initCollection()
        }
    }
</script>

<style scoped>

</style>