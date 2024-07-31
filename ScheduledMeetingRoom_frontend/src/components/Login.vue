<script setup lang="ts" name="Login">
import { ref } from "vue"
import axios from "axios"
import { LoginRequest, LoginResponse } from '../types/auth'

const username = ref("")
const password = ref("")
const error = ref("")

async function login() {
    debugger
    let loginPayload: LoginRequest = {
        Email: username.value,
        Password: password.value
    }
    try {
        axios.post('https://localhost:7292/api/Account/login', JSON.stringify(loginPayload), {
            proxy: {
                protocol: 'https',
                host: '127.0.0.1',
                port: 7292,
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response)
        }).catch((responseError) => console.log(responseError))
    } catch (err) {
        console.log(err)
    }
}
</script>

<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input v-model="username" type="text" id="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit" @click="login">Login</button>
            <p v-if="error">{{ error }}</p>
        </form>
    </div>
</template>

<style scoped>
.login {
    max-width: 300px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login div {
    margin-bottom: 1rem;
}
</style>
