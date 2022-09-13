import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes.js'
import store from '@/store'
// 先把 VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // call|apply区别
        // 相同点：都可以调用函数一次，都可以选择函数上下文一次
        // 不同点：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        // call|apply区别
        // 相同点：都可以调用函数一次，都可以选择函数上下文一次
        // 不同点：call传递参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
const router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // y代表滚动条滚动到最上方
        return { y: 0 }
      },
})

// 全局守卫：前置守卫（在路由跳转之前开始判断）
router.beforeEach(async(to,from,next)=>{
    // 用户登录了，才会有token，未登录不一定有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token){
        // 用户已经登录了，不能在去登录了
        if(to.path == '/login' || to.path == '/register'){
            next('/home')
        }else{
            // 登录了，去的不是login
            //如果用户名已有
            if(name){
                next()
            }else{
                try {
                    // 没有用户信息
                await store.dispatch('user/getUserInfo')
                next()
                } catch (error) {
                    // token失效
                    // 1.清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }    
        }
    }else{
        // 未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        // 去的不是上面这些路由（home/search/shopcart) --放行
        let toPath = to.path
        if(toPath == '/trade' || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
        
    }
   
})

router.afterEach((to,from)=>{
    document.title = to.meta.title || '小栗子'
})
export default router
