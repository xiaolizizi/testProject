import { reqCategoryList, reqGetBannerList ,reqFloorList} from "@/API"
// search模块的小仓库
const state = {
    // state中数据默认处置别瞎写，服务器返回对象，则起始值是一个空对象
    // 服务器返回数组，起始值就是空数组
    // 根据接口返回值初始化的

    // home仓库中存储三级菜单的数据
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    floorList:[]

}
const mutations = {
    CATEGORYLIST(state,categoryList){
        // categoryList就是actions提交过来的result.data
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    async categoryList(context){
        let result =await reqCategoryList()
        if(result.code === 200){
            context.commit('CATEGORYLIST',result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList(context){
        let result = await reqGetBannerList();
        if(result.code === 200){
            context.commit('GETBANNERLIST',result.data)
        }
        
    },
    // 获取floor的数据
    async getFloorList(context){
        let result = await reqFloorList();
        if(result.code == 200){
            context.commit('GETFLOORLIST',result.data)
        }
    }
}
const getters = {}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}