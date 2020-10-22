<template>
    <van-form>
        <van-field
                v-model="loginForm.phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                clearable
                autocomplete="off"
                :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
                v-model="loginForm.code"
                center
                clearable
                name="code"
                label="短信验证码"
                placeholder="请输入短信验证码"
        >
            <template #button>
                <van-button size="small" type="primary" v-show="!time"
                            @click="getCode">发送验证码
                </van-button>
                <van-button size="small" type="info" v-show="time">({{time
                    }})</van-button>
            </template>
        </van-field>
        <div style="margin: 16px">
            <van-button round block type="info" native-type="submit" @click="handleSubmit(loginForm)">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script>
    import {Button, Field, Form} from "vant";
    import 'vant/lib/form/style';
    import 'vant/lib/field/style'
    import 'vant/lib/button/style'
    // import {apilogin} from "../../http/api";

    export default {
        name: "Login",
        data(){
            return {
                loginForm:{
                    phone:'',
                    code:''
                },
                time:''
            }
        },
        components:{
            VanForm:Form,
            VanField:Field,
            VanButton:Button
        },
        methods:{
            handleSubmit(value){
                /*apilogin(value).then(res=>{
                    this.$store.commit('setToken',res.token)
                }).catch(error=>{
                    error
                })*/
                let redirect = this.$route.query.redirect || 'index';
                let query = this.$route.query.params || {}
                let obj = Object.assign({},value,{redirect},{query})
                this.$store.dispatch('handlerLogin',obj)
            },
            getCode(){
                if (!this.time){
                    this.time=3;
                    this.loginForm.code=Math.floor(Math.random()*(9999-999)+1000)
                    let t= setInterval(()=>{
                        if (this.time > 0){
                            this.time--
                        }else{
                            clearInterval(t);
                            this.time=0;
                        }
                    },1000)
                }
            }
        }
    }
</script>

<style scoped>

</style>