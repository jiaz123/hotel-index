<template>
    <div>
        <van-form>
            <van-field
                    v-model="registerForm.nickname"
                    name="nickname"
                    label="用户名"
                    placeholder="用户名"
                    clearable
                    left-icon="smile-o"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="registerForm.password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                    v-model="registerForm.phone"
                    name="phone"
                    label="手机号"
                    placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
                    v-model="registerForm.code"
                    center
                    clearable
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

                <van-field name="checkbox" label="复选框">
                    <template #input>
                        <van-checkbox v-model="registerForm.isagree" shape="square" />
                    </template>
                </van-field>
             <div style="margin: 16px">
                 <van-button round block type="info" native-type="submit" @click="handleSubmit">
                    提交
                 </van-button>
             </div>
        </van-form>
    </div>
</template>

<script>
    import {Form,Field,Button,Checkbox} from 'vant'
    import 'vant/lib/form/style';
    import 'vant/lib/field/style'
    import 'vant/lib/button/style'
    import 'vant/lib/checkbox/style'
    import {apiregister} from "../../http/api";
    export default {
        name: "Register",
        data(){
            return {
                registerForm:{
                    nickname:'',
                    password:'',
                    isagree:false,
                    phone:'',
                    code:''
                },
                time:0,
            }
        },
        components:{
            VanForm:Form,
            VanField:Field,
            VanButton:Button,
            VanCheckbox:Checkbox
        },
        methods:{
            handleSubmit(){
                let data = {}
                if(this.registerForm.isagree == true){
                    data['nickname']=this.registerForm.nickname
                    data['password']=this.registerForm.password
                    data['phone']=this.registerForm.phone
                    apiregister(data).then(res=>{
                        res
                    }).catch(error=>{
                        error
                    })
                }
            },
            getCode(){
                if (!this.time){
                    this.time=60;
                    this.registerForm.code=Math.floor(Math.random()*(9999-999)+1000)
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