<script setup lang="ts" name="Login">
import { ref } from "vue"
import axiosInstance from "../utils/axiosApiClient"
import { LoginRequest, LoginResponse } from '../types/auth'

const username = ref("admin@example.com")
const password = ref("Admin@123456")
const rememberme = ref(false)

async function login() {
    let loginPayload: LoginRequest = {
        Email: username.value,
        Password: password.value,
        RememberMe: rememberme.value
    };
    try {
        // axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'; // 可使用
        const response = await axiosInstance.post<LoginResponse>("/Account/login",
            JSON.stringify(loginPayload), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            debugger
            let { token } = response.data
        }).catch(function (error) {
            debugger
            let { result } = error.response.data
        });
    } catch (exception) {
        debugger
        console.log(exception)
    }
}
</script>

<template>
    <div class="login-page bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                    <h3 class="mb-3">Login Now</h3>
                    <div class="bg-white shadow rounded">
                        <div class="row">
                            <div class="col-md-7 pe-0">
                                <div class="form-left h-100 py-5 px-5">
                                    <form class="row g-4" @submit.prevent="login">
                                        <!-- 用戶名 -->
                                        <div class="col-12">
                                            <label>Username<span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                                <input type="text" class="form-control" placeholder="Enter Username"
                                                    required v-model="username">
                                            </div>
                                        </div>
                                        <!-- 密碼 -->
                                        <div class="col-12">
                                            <label>Password<span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                <input type="password" class="form-control" placeholder="Enter Password"
                                                    required v-model="password">
                                            </div>
                                        </div>
                                        <!-- 記住我 -->
                                        <div class="col-sm-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="inlineFormCheck"
                                                    v-model="rememberme">
                                                <label class="form-check-label" for="inlineFormCheck">Remember
                                                    me</label>
                                            </div>
                                        </div>
                                        <!-- 忘記密碼 -->
                                        <div class="col-sm-6">
                                            <a href="#" class="float-end text-primary">Forgot Password?</a>
                                        </div>
                                        <!-- 登入按鈕 -->
                                        <div class="col-12">
                                            <button type="submit" class="btn btn-primary px-4 float-end mt-4"
                                                @click="login">login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-5 ps-0 d-none d-md-block">
                                <div class="form-right h-100 bg-primary text-white text-center pt-5">
                                    <i class="bi bi-bootstrap"></i>
                                    <h2 class="fs-1">Welcome Back!!!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-end text-secondary mt-3">Bootstrap 5 Login Page Design</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
