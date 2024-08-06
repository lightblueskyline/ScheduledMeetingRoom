<script setup lang="ts" name="App">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import axios from 'axios'

onMounted(() => {
  debugger
  // 測試 mock 數據
  axios.post('/api/user/login', {
    username: 'admin',
    password: '111111'
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
</style>
