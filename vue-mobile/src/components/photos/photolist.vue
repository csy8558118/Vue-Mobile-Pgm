<template>
  <div>
     <!-- 顶部滑动条标题区域 -->
    <div id="slider" class="mui-slider ">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id ==0 ? 'mui-active' :'']" v-for="item in cates" :key='item.id' @click='getPhotoListByCateId(item.id)'>{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>

export default {
  data() {
    return {
       //存放标题列表的数组
       cates:[],
       //存放图片列表的数组
       list:[],

    };
  },
  created(){
   this.getAllCategory()
   //当也难第一次加载的时候就主动的请求数据
   this.getPhotoListByCateId(0)
  },
  
  methods: {
     //获取所有的标题分类
     getAllCategory(){
        this.$http.get('api/getimgcategory').then(result=>{
           if(result.body.status===0){
              result.body.message.unshift({ title:"全部",id:0});
              this.cates=result.body.message;
           }
        })
     },
     //获取所有的图片
     getPhotoListByCateId(cateid){
        this.$http.get('api/getimages/' + cateid).then(result=>{
           if(result.body.status===0){
              this.list = result.body.message;
           }
        })
     }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>