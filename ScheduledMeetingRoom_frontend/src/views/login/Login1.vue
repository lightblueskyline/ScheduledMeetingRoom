<template>
    <div class="login-form">
        <el-form ref="ruleFormRef" style="max-width: 600px;" :model="loginForm" :rules="rules" label-width="auto"
            :label-position="labelPosition" :size="size">
            <h3>...歡迎...</h3>
            <br>
            <el-form-item label="用戶名：" prop="email">
                <el-input v-model="loginForm.email" :prefix-icon="User" clearable></el-input>
            </el-form-item>
            <el-form-item label="密碼：" prop="password">
                <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock" clearable
                    show-password></el-input>
            </el-form-item>
            <el-form-item label="記住我">
                <el-checkbox v-model="loginForm.rememberMe"></el-checkbox>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" @click="submitForm(ruleFormRef)">登入</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts" name="Login1">
import { ref, reactive } from "vue"
import type { ComponentSize, FormProps, FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { LoginForm } from '../../api/user/type'
import axiosInstance from '../../utils/axiosInstance'

const size = ref<ComponentSize>('large')
const labelPosition = ref<FormProps['labelPosition']>('left')
const ruleFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
    email: 'admin@example.com',
    password: 'Admin@123456',
    rememberMe: false,
})
// 定義驗證規則
const rules = reactive<FormRules<LoginForm>>({
    email: [{ required: true, message: '請輸入用戶名', trigger: 'blur' }],
    password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
})

/**
 * 提交登入表單
 * @param formEl 
 */
async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) {
        return
    }
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 驗證成功，發送登入請求
            axiosInstance({
                url: '/Account/login',
                method: 'post',
                // data: {
                //     Email: 'admin@example.com',
                //     Password: 'Admin@1234567'
                // },
                data: JSON.stringify(loginForm),
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        } else {
            // 驗證失敗
            console.log('錯誤提交！', fields)
        }
    })
}

/**
 * 重置登入表單
 * @param formEl 
 */
function resetForm(formEl: FormInstance | undefined) {
    if (!formEl) {
        return
    }
    formEl.resetFields()
}
</script>

<style scoped lang="scss">
.login-form {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
        display: flex;
        justify-content: center;
        font-size: xx-large;
        color: $global-color-red;
    }

    .btn-box {
        display: flex;
        justify-content: center;
        padding: 0 30px;
        box-sizing: border-box;
    }
}
</style>