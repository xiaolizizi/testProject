<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <!-- 如果是第一个组件，则list的数据就是第一个数组 -->
    <!-- 如果是第二个组件，则list的数据就是第二个数组 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import { mapState } from "vuex";
export default {
  name:'Home',
  components:{ListContainer,TodayRecommend,Rank,Like,Floor,Brand},
  mounted(){
    this.$store.dispatch('home/getFloorList')
  },
  computed:{
      ...mapState({
        floorList:(state)=>state.home.floorList
      })
    }
}
</script>

<style>

</style>