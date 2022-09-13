import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/API"
// shopcart模块的小仓库
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }   
}
const actions = {
    // 获取购物车的数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车的数据
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result =await reqUpdateCheckedByid(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart(context){
        // 获取购物车中全部的产品
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked == 1 ? context.dispatch('deleteCartListBySkuId',item.skuId) :''
            // 将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        })
        // 只有全部的promise都成功，返回结果为成功
        // 如果有一个失败，返回既为失败结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
// 计算属性，在项目中，为了简化数据而生
const getters = {
   cartList(state){
    return state.cartList[0] || {}
   },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}