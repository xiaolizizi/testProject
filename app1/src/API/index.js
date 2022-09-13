// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList get 参数无
export const reqCategoryList = ()=>{
    // 发送请求:axios发送请求返回结果Promise对象
    return requests({url:'/api/product/getBaseCategoryList',method:'get'})
}

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=>{
    return mockRequests.get('/banner')
}

// 获取floor组件数据
export const reqFloorList = ()=>{
    return mockRequests.get('/floor')
}

// 获取搜索模块的数据 地址：/api/list 请求方式post 参数：需要带参数
// 当前这个函数需要接受外部传递的参数
// 当前这个接口，给服务器传递参数params，至少是一个空对象
/* export const reqGetSearchInfo = (params)=>{
    return requests({
        url:'/api/list',
        method:"post",
        data:params
    })
} */
export const reqGetSearchInfo = ()=>{
    return mockRequests.get('/list')
}


// 获取产品详情信息的接口 地址：/api/item/{ skuId } 请求方式get
export const reqGoodsInfo = (skuId)=>requests({
    url:`/api/item/${skuId}`,
    method:'get'
})

// 将产品添加到购物车中（获取更新某一个产品的个数）地址：/api/cart/addToCart/{ skuId }/{ skuNum } 方法：post
export const reqAddOrUpdateShopCar = (skuId,skuNum)=>requests({
    url:`/api/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

// 获取购物车列表数据接口  地址：/api/cart/cartList 方法：get
export const reqCartList = ()=>requests({
    url:'/api/cart/cartList',
    method:'get'
})

// 删除购物车产品的接口 地址：/api/cart/deleteCart/{skuId} 方法：delete
export const reqDeleteCartById = (skuId)=>requests({
    url:`/api/cart/deleteCart/${skuId}`,
    method:'delete'
})

// 修改商品选择的状态 地址：/api/cart/checkCart/{skuID}/{isChecked} 方法：get
export const reqUpdateCheckedByid = (skuId,isChecked) =>requests({
    url:`/api/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

// 获取验证码 地址：/api/user/passport/sendCode/{phone}  方法：get
export const reqGetCode = (phone) =>requests({
    url:`/api/user/passport/sendCode/${phone}`,
    method:'get'
})

// 用户注册 地址：/api/user/passport/register 方法：post 参数：phone，code，password
export const reqUserRegister = (data)=>requests({
    url:`/api/user/passport/register`,
    data,
    method:'post'
})

// 用户登录 地址：/api/user/passport/login 方法：post  参数：phone,password
export const reqUserLogin = (data)=>requests({
    url:'/api/user/passport/login',
    data,
    method:'post'
})

// 获取用户信息【需要带着用户的token向服务器要用户信息】 地址：/api/user/passport/auth/getUserInfo 方法：get
export const reqUserInfo = ()=>requests({
    url:`/api/user/passport/auth/getUserInfo`,
    method:'get'
})

// 退出登录 地址：/api/user/passport/logout  方法：get
export const reqLogout = ()=>requests({
    url:'/api/user/passport/logout',
    method:'get'
})

// 获取用户地址信息  地址：/api/user/userAddress/auth/findUserAddressList 方法：get
export const reqAddressInfo = ()=>requests({
    url:'/api/user/userAddress/auth/findUserAddressList',
    method:'get'
})

// 获取商品清单 地址：/api/order/auth/trade  方法：get
export const reqOrderInfo = ()=>requests({
    url:'/api/order/auth/trade',
    method:'get'
})

// 提交订单的接口  地址：/api/order/auth/submitOrder?tradeNo={tradeNo} 方法：post
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})

// 获取支付信息 地址：/api/payment/weixin/createNative/{orderId} 方法：get
export const reqPayInfo = (orderId)=>requests({
    url:`/api/payment/weixin/createNative/${orderId}`,
    method:'get'
})

// 获取支付订单状态  地址：/api/payment/weixin/queryPayStatus/{orderId}  方法：get
export const reqPayStatus = (orderId) =>requests({
    url:`/api/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

// 获取订单列表 地址：/api/order/auth/{page}/{limit}  方法：get
export const reqMyOrderList = (page,limit)=>requests({
    url:`/api/order/auth/${page}/${limit}`,
    method:'get'
})
