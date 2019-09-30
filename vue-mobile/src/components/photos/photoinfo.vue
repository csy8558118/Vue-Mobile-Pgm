<template>
   <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview> 
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
// 1. 导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
   data(){
      return{
         id:this.$route.params.id,
         photoinfo:[],
         //缩略图数组
         list:[],
      }
   },
   created(){
      this.getPhotoInfo();
      this.getThumbs();
   },
   methods:{
      // 获取图片的详情
      getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
     // 获取缩略图
      getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
           // 因为缩略图的组件表明必须要有这w和h这两个属性，但是我们请求到的数据中是没有的，
           // 所以我们必须要先循环出这个数据，再给每一个数据手动添加
           result.body.message.forEach(item=>{
              item.msrc=item.src;
              item.w=600;
              item.h=400;
           })
          // 把完整的数据保存到 list 中
          this.list = result.body.message;
        }
      })
    },
    //关闭缩略图
      handleClose(){
      console.log('close event')
    }
   },
   components: {
      // 注册 评论子组件
      "cmt-box": comment
   }
}
</script>
<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    figure{
      display: inline-block !important;width:calc(100%/3);
      img{
        margin: 10px;
        box-shadow: 0 0 8px #999;
      }
    }
  }
  
  
}
</style>