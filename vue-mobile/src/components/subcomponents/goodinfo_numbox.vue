<template>
  <el-input-number v-model="num" @change="handleChange" :min="1" :max="this.max" label="描述文字"></el-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: 1,
      };
    },
    mounted(){
      
    },
    methods: {
      handleChange(value) {
        console.log(this.max)
        //将 组件内修改的值，通过子组件向父组件传值的方法，将数值传递给父组件
        this.$emit('getCount',parseInt(value))
      },
    },
    props:['max'],
    watch:{
      //属性监听
      max:function(newVal,oldVal){
        console.log(newVal)
        this.max=newVal;
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>