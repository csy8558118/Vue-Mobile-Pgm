<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :swiperList='swiperList' :isfullWidth='true'></swiper>

    <!-- 六宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
//按需引入提示组件
import { Toast } from "mint-ui";
import swiper from '../subcomponents/swiper.vue'
export default {
  data() {
    return {
      //保存轮播图的数组
      swiperList: []
    };
  },
  created() {
    this.getSwiper();
  },
  methods: {
    //获取轮播图数据
    getSwiper() {
      this.$http
      .get("api/getlunbo")
      .then(result => {
        // console.log(result.body);

        if (result.body.status === 0) {
          //成功获取数据
          this.swiperList = result.body.message;
          // Toast({
          //    message: '加载轮播图OK',
          //    position: 'middle',
          //    duration: 2000
          // });
        } else {
          //获取数据失败
          Toast({
            message: "加载轮播图失败",
            position: "middle",
            duration: 2000
          });
        }
      });
    }
  },
  components:{
    swiper
  }
};
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  border: none;
  background-color: #fff;
  .mui-table-view-cell {
    border: 0;
    img{width: 60px;}
    .mui-media-body{font-size: 13px}
  }
}
</style>