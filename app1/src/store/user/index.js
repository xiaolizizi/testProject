import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/API"
import { setToken,getToken,removeToken } from "@/utils/token"
// 登录注册模块的小仓库
const state = {
    code:'',
    token:getToken(),
    userInfo:{},
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        // 把仓库中相关用户信息清空
        state.token = ''
        state.userInfo = {}
        // 本地存储数据清空
        removeToken()
    }
}
const actions = {
    // 获取验证码的这个接口，把验证码返回
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录[token]
    async userLogin({commit},user){
        let result = await reqUserLogin(user)
        // 服务器下发的token,用户的唯一标识符(uuid)
        // 将来经常通过带token找服务器要用户信息
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fiale'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
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