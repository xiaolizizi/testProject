import { reqGetSearchInfo } from "@/API"
// search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},params={}){
       let result = await reqGetSearchInfo(params)
       if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
       }
    }
}
// 计算属性，在项目中，为了简化数据而生
const getters = {
    // 当前仓库里的state
    goodsList(state){
        // 加入网络不给力，没有网state.searchList.goodsList应该返回的是undefined
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}