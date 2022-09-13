<template>
  <div>
    <Header />
    <!-- <router-link to="/home">跳转到home</router-link> -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
// 引入
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储与仓库当中
    this.$store.dispatch("home/categoryList");
    // 派发actions，通过vuex发起ajax请求，将数据仓库当中
    this.$store.dispatch("home/getBannerList");
  },
};
</script>

<style>
</style>
