<template>
    <div class="hero">
        <div class="container d-flex flex-column justify-content-center align-items-center text-center position-relative"
            data-aos="zoom-out">
            <img src="../../assets/images/hero-img.svg" class="img-fluid animated" alt="">
            <br>
            <h1>...&nbsp;歡&nbsp;迎&nbsp;...</h1>
        </div>
    </div>
</template>

<script setup lang="ts" name="Welcome">
// 編程式路由導航
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import { getHourMatchingMessage } from '../../utils/tools'

const router = useRouter();

onMounted(() => {
    ElNotification({
        title: '登錄成功',
        message: getHourMatchingMessage(),
        type: 'success',
    })
    // 展示歡迎畫面，之後跳轉至首頁
    setTimeout(() => {
        router.push('/home');
    }, 3000);
})
</script>

<style scoped lang="scss">
.hero {
    width: 100%;
    min-height: 50vh;
    position: relative;
    padding: 120px 0 60px 0;
    display: flex;
    align-items: center;
    background: url("../img/hero-bg.png") center center;
    background-size: cover;

    h1 {
        margin: 0 0 10px 0;
        font-size: 48px;
        font-weight: 300;
        color: $global-color-red;
    }

    .animated {
        margin-bottom: 60px;
        animation: up-down 2s ease-in-out infinite alternate-reverse both;
    }
}

@media (min-width: 992px) {
    .hero .animated {
        max-width: 45%;
    }
}

@media (max-width: 991px) {
    .hero .animated {
        max-width: 60%;
    }
}

@media (max-width: 575px) {
    .hero .animated {
        max-width: 80%;
    }
}
</style>
