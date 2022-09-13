<template>
  <div class="pagination" >
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-show="startNumAndEndNum.start>2">···</button>

    <!-- 中 -->
    <button 
      v-for = "(page,index) in startNumAndEndNum.end" 
      :key="index" 
      v-show="page>=startNumAndEndNum.start"
      @click = "$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
       >
        {{page}}
    </button>
    
    <!-- 下 -->
    <button v-show="startNumAndEndNum.start<totalPage - continues">···</button>
    <button v-show="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo>=totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','continues','total'],
  computed:{
    totalPage(){
      return Math.ceil(this.total/this.pageSize)
    },
    startNumAndEndNum(){
      const {continues,pageNo,totalPage} = this
      // 定义两个变量起始数字，结束数字
      let start = 0
      let end = 0
      if(continues > totalPage){
        start=1
        end = totalPage
      }else{
        // 起始数据
        start = pageNo - parseInt(continues/2)
        // 结束数据
        end = pageNo + parseInt(continues/2)
        // 把出现不正常的现象【start数字出现0|负数】纠正
        if(start<1){
          start = 1
          end = continues
        }
        if(end>totalPage){
          end = totalPage
          start = totalPage - continues
        }
      }
      return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>