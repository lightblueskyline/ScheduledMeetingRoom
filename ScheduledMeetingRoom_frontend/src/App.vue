<script setup lang="ts" name="App">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h2>XXX</h2>
  <!-- 導航區 -->
  <div>
    <router-link to="/welcome" active-class="">歡迎&nbsp;</router-link>
    <router-link to="/welcome" active-class="">歡迎&nbsp;</router-link>
    <router-link to="/welcome" active-class="">歡迎</router-link>
  </div>
  <!-- 展示區 -->
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
