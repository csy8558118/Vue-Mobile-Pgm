<template>
   <div>
      <!--
         轮播图组件 ，
         将来谁使用轮播图组件，谁就为我们传递 swiperList 
         此时 swiperList 应该是父组件向子组件传值来设置 ，需要用 props来接收传过来的值
      -->
      <!-- 
         为什么商品评论中的轮播图，会被拉伸到最大
         在首页中的图片，它的宽和高，都使用的是100%的宽度，
         在商品详情中，轮播图的图片， 如果也使用宽高为100%的话，图片会被拉伸到最大，
         商品轮播图的宽度很小，达不到屏幕的宽度，所以 width：100% 的时候，就会被拉伸
         我们希望商品详情页的图片是自适应，高度为100%，首页中的为宽度100%，高度自适应

         所以 在这两个轮播的所有都不冲突，只有宽高不一样时，我们可以定义一个属性，让使用轮播图的调用者，可以手动的指定是否为width:100%
         在每一个调用页面，都再传一个值isfullWidth，再在swiper这个组件中，绑定一个属性在props中，方便在后面用到，
         通过传值的为true 或者为 false，使用class的绑定来判断这个类名是否要使用
       -->

      <mt-swipe :auto="4000">
         <!-- 组件中使用 v-for循环的话，一定要使用 key -->
         <mt-swipe-item v-for="item in swiperList" :key="item.img">
         <img :src="item.img" :class="{'fullWidth':isfullWidth}"/>
         </mt-swipe-item>
      </mt-swipe>
   </div>
</template>
<script>
export default {
   props:['swiperList','isfullWidth']
}
</script>
<style lang="scss" scoped>
.mint-swipe { 
  height: 200px;
  .mint-swipe-item {
     text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
  .fullWidth{width: 100%;}
}
</style>