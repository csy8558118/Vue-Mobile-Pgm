<template>
  <el-input-number v-model="num" @change="handleChange" :min="1" size="small"></el-input-number>
</template>
<script>
  export default {
    data() {
      return {
        //从父组件那里获取新的商品数量，然后绑定在数值上
        num: this.initcount,
      };
    },
    mounted(){
      
      this.handleChange();
    },
    methods: {
      //绑定值被改变时触发
      handleChange(num) {
        console.log(this.goodid)
        console.log(this.initcount)
        
        
        //调用vuex上的方法，只要数据更新，就同步vuex上的方法
        this.$store.commit('updateGoodsinfo',{id:this.goodid,count:this.num})
      },
    },
    props:['initcount','goodid'],
  };
</script>
<style lang="scss" scoped>
</style>