<template>
    <div class="login-container">
        <el-row>
            <!-- 左側空白區域 < 768px 自動隱藏 -->
            <el-col :span="12" :xs="0"></el-col>
            <!-- 右側表單 -->
            <el-col :span="12" :xs="24">
                <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" label-width="auto"
                    :label-position="labelPosition" :size="size" class="login-form">
                    <h1>...歡迎...</h1>
                    <h2>XXX_XXX_XXX</h2>
                    <el-form-item label="" prop="email">
                        <el-input v-model="loginForm.email" :prefix-icon="User" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock" clearable
                            show-password></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="記住我">
                        <el-checkbox v-model="loginForm.rememberMe"></el-checkbox>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">登入</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="Login">
import { ref, reactive } from "vue"
import type { ComponentSize, FormProps, FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { LoginForm } from '../../api/user/type'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useUserStore } from "../../store/modules/userStore"

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
const router = useRouter();
const userStore = useUserStore()

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
            userStore.userLogin(loginForm).then(() => {
                router.push('/')
            }).catch((error) => {
                console.log(error)
            })
        } else {
            // 驗證失敗
            console.log('error submit!', fields)
            ElMessage({
                message: '請輸入用戶名 & 密碼',
                type: 'warning',
            })
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
.login-container {
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login-form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('../../assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: whitesmoke;
            font-size: 20px;
            margin: 20px 0px;
        }
    }
}
</style>