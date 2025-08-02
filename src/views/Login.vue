<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px">
                <h1 class="ml">动力港能源管理平台</h1>
            </div>
            <el-form ref="formRef" label="用户名" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="Lock" type='password' />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import logo from "@/assets/logo.png"
import {useUserStore} from '@/store/auth.ts'

interface RuleForm {
    username: string;
    password: string
}
const ruleForm: RuleForm = reactive({ //reactive官网有明确说明，不推荐使用泛型的写法
    username: "",
    password: ""
})
const formRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 4, max: 8, message: '用户名要求4到8位字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        // { pattern: /^\d{6}$/, message: '密码必须是6位纯数字', trigger: 'blur' }
    ],
})
const userStore = useUserStore();
function handleLogin() {
    formRef.value?.validate(async (valid: boolean) => { //?.可选链操作符 
        if(valid){
            // 校验通过
            userStore.login(ruleForm);
        }
    })
}
</script>

<style lang="less" scoped>
.bg {
    background-image: url("@/assets/bg.png");
    background-size: cover; // 全屏
    background-position: center; //位置中间
    background-repeat: no-repeat;
    height: 100vh;

    .login {
        width: 500px;
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px;
        left: 10%;

        .logo {
            display: flex;
            justify-self: center;
            align-items: center;
            margin-bottom: 40px;

            h1 {
                color: rgb(14, 53, 148);
            }
        }
    }
}
</style>