<template>
   <cmtbox :id='$route.params.id'></cmtbox>
</template>
<script>
import cmtbox from '../subcomponents/comment.vue' 
export default {
   components:{
      cmtbox
   }
}
</script>
<style lang="scss" scoped>

</style>