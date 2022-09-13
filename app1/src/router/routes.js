// import Home from '../pages/Home/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
// import Search from '../pages/Search/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'


// 路由配置信息
export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true,title:'个人中心' },
        children:[
            {
                path: 'myorder',
                component: MyOrder,
                meta:{title:'我的订单'}
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect:'/center/myorder',
            },
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true,title:'支付成功' }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true,title:'支付' },
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path == '/trade'){
                next()
            }else{
                // 其他的路由组件而来，停留在当前
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true,title:'交易' },
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path == '/shopcart'){
                next()
            }else{
                // 其他的路由组件而来，停留在当前
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true,title:'购物车' }
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true,title:'添加购物车成功' }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true,title:'详情' }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true,title:'主页' }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false,title:'登录' }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false,title:'注册' }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true,title:'搜索' },
        // 布尔值写法：params
        // props:true
        // 对象写法：额外的给路由组件传递一些props
        // props:{a:1,b:2}
        // 函数写法：可以params参数、query参数
        props: ($route) => {
            return { keyWord: $route.params.keyWord, k: $route.query.k }
        }
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]