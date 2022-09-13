import { reqGoodsInfo,reqAddOrUpdateShopCar } from "@/API"
// 封装游客身份模块uuid
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCar({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code--200，代表这次操作成功
        // 因为服务器没有返回其余的数据，因此不用三连环存储数据
        let result = await reqAddOrUpdateShopCar(skuId,skuNum)
        if(result.code == 200){
            // 代表加入购物车成功
            return 'ok'
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state){
        // 路径导航简化的数据
        // 发送请求是个异步任务，可能goodInfo为空对象，空对象的categoryView属性值undefined
        // 所以计算出的categoryView至少是个空对象
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品的售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
