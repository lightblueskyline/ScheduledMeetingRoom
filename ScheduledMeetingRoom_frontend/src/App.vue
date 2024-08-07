<script setup lang="ts" name="App">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
// import axios from 'axios'
import axiosInstance from './utils/axiosInstance'

onMounted(() => {
  debugger
  // 測試 mock 數據
  // axios.post('/api/user/login', {
  //   username: 'admin',
  //   password: '111111'
  // }).then(function (response) {
  //   console.log(response);
  // }).catch(function (error) {
  //   console.log(error);
  // });
  //
  axiosInstance({
    url: '/Account/login',
    method: 'post',
    data: {
      Email: 'admin@example.com',
      Password: 'Admin@1234567'
    },
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    debugger
    console.log(response)
  }).catch(error => {
    debugger
    console.log(error)
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
