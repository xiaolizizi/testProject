import { reqAddressInfo,reqOrderInfo } from "@/API"

// 订单模块的小仓库
const state = {
    tradeInfo:[],
    orderInfo:{}
}
const mutations = {
    GETUSERADDRESS(state,tradeInfo){
        state.tradeInfo = tradeInfo
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async grtUserAddress({commit}){
        let result =await reqAddressInfo()
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    // 获取商品清单的数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('GETORDERINFO',result.data)
        }
    }
}
// 计算属性，在项目中，为了简化数据而生
const getters = {
   
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}