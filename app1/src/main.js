import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 --全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
// 轮播图 --全局组件
import Carousel from './components/Carousel'
Vue.component(Carousel.name,Carousel)
// 引入分页器全局组件
import Pagination from './components/Pagination'
Vue.component(Pagination.name,Pagination)
// 引入Element UI
import { Button,MessageBox,Message} from 'element-ui';
Vue.component(Button.name,Button)
// ElementUI注册组件的时候，还可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入懒加载图片插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import atm from '@/assets/images/1.gif'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:atm
})
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServe.js ---mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求函数
import * as API from '@/API'
Vue.config.productionTip = false

//引入表单校验插件
import validate from "@/plugins/validate";
new Vue({
  render: h => h(App),
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  }
}).$mount('#app')
