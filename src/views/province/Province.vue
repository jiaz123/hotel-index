<template>
    <div>
        <van-index-bar :index-list="provinceKeys">
            <div v-for="item in provinceKeys" :key="item">
                <van-index-anchor :index="item">{{item}}</van-index-anchor>
                <van-cell :title="city.province" v-for="(city,index) in province[item]" :key="index" @click="handleProvince(city.province)" />
            </div>
        </van-index-bar>
    </div>
</template>

<script>
    import { IndexBar, IndexAnchor, Cell } from 'vant';
    import 'vant/lib/index-bar/style'
    import 'vant/lib/cell/style'
    import 'vant/lib/index-anchor/style'
    import city from '../../lib/city'
    export default {
        name: "Province",
        data(){
          return {
              province:{}
          }
        },
        components:{
            vanIndexBar:IndexBar,
            vanIndexAnchor:IndexAnchor,
            vanCell:Cell
        },
        computed:{
          provinceKeys(){
              let arr = []
              if (JSON.stringify(this.province)!='{}'){
                  arr = Object.keys(this.province).sort()
              }
              return arr
          }
        },
        methods: {
            initProvince(){
                city.province.forEach(ele=>{
                    let firstChar=ele.en.charAt(0).toUpperCase();
                    if(!this.province[firstChar]){
                        this.$set(this.province,firstChar,[])
                        // this.province[firstChar]=[]
                    }
                    this.province[firstChar].push(ele)
                })
            },
            handleProvince(province){
                this.$store.commit('setProvince',province);
                this.$router.back();
            }
        },
        mounted() {
            this.initProvince()
        }
    }
</script>

<style scoped>

</style>