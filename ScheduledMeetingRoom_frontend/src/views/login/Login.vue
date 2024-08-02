<template>
    <div class="custom-container">
        <div>
            <h1>...歡迎...</h1>
            <el-form>
                <el-form-item label="Username">
                    <el-input v-model="username" size="large" placeholder="abc@def.com" :prefix-icon="User"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="password" size="large" type="password" :prefix-icon="Lock" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="large" type="primary">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import { ref } from "vue"
import { User, Lock } from '@element-plus/icons-vue'

const username = ref("admin@example.com")
const password = ref("Admin@123456")
</script>

<style scoped>
.custom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>