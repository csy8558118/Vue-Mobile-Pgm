<template>
   <div class="goodsinfo-container">
      <transition
         @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter">
            <!-- 如果行让一个动画只有半场，那么就需要在动画标签上定义动画钩子函数的过程，需要使用哪些函数 -->
         <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>

      <!-- 商品轮播图区域 -->
      <div class="mui-card">
         <div class="mui-card-content">
         <div class="mui-card-content-inner">
            <swiper :swiperList="lunbotu" :isfullWidth="false"></swiper>
         </div>
         </div>
      </div>

      <!-- 商品购买区域 -->
      <div class="mui-card">
         <div class="mui-card-header">{{ goodsinfo.title }}</div>
         <div class="mui-card-content">
            <div class="mui-card-content-inner">
               <p class="price">
                  市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
               </p>
                <p>购买数量：
                   <numbox  :max="goodsinfo.stock_quantity" @getCount='getSelectCount'></numbox>
                </p>
               <p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                  <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                  <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                  <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
                  <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
                  <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                  <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
               </p>
            </div>
         </div>
      </div>

      <!-- 商品参数区域 -->

      <div class="mui-card">
         <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
               <div class="mui-card-content-inner">
                  <p>商品货号：{{ goodsinfo.goods_no }}</p>
                  <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                  <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
               </div>
            </div>
            <div class="mui-card-footer">
               <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
               <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
         </div>
      </div>
</template>
<script>

// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
//导入 数字选择框组件
import numbox from "../subcomponents/goodinfo_numbox.vue";

export default {
   data(){
      return{
         id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
         lunbotu: [], // 轮播图的数据
         goodsinfo: {}, // 获取到的商品的信息
         ballFlag: false, // 控制小球的隐藏和显示的标识符
         selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
      }
   },
   created(){
      this.getLunbotu();
      this.getGoodsInfo();
   },
   methods:{
      //获取轮播图的数据
      getLunbotu(){
         this.$http.get('api/getthumimages/'+this.id).then(result=>{
            if(result.body.status===0){
               //在api文档中，我们可以看到，数据传递过来的是src，而轮播图组件中，只能以item.img来接收图片的地址，
               //所以需要对传递过来的数据进行进一步的处理
               result.body.message.forEach(item=>{
                  item.img=item.src;
               })
               this.lunbotu=result.body.message;
            }
         });
      },
      //获取商品详情的数据
      getGoodsInfo(){
         this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
            if(result.body.status===0){
               this.goodsinfo=result.body.message[0];
            }
         })
      },
      // 点击使用编程式导航跳转到 图文介绍页面
      goDesc(id) {
         this.$router.push({ name: "goodsdesc", params: { id } });
      },
      // 点击跳转到 评论页面
      goComment(id) {
         this.$router.push({ name: "goodscomment", params: { id } });
      },
      //添加到购物车
      addToShopCar(){
         this.ballFlag = !this.ballFlag;
         //商品对象设计成如下：{id:商品的id, count:商品的数量,price:商品的价格,selected:false(商品在购物城中是否被选中),}
         //拼接成一个，要保存到store中car数组里的商品信息对象
         var goodinfo = {id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true,}
         //调用store中的addToCar，将数据追加到数组中
         this.$store.commit('addToCar',goodinfo);
      },
      //动画钩子函数 el:的意思是transition所绑定的对象
      beforeEnter(el){
         el.style.transform= "translate(0, 0)";
      },
      enter(el, done){
         el.offsetWidth; //这句话是让小球有动起来的效果
         // 小球动画优化思路：
            // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
            // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
            // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
            // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()
         
         // 获取小球的 在页面中的位置
         const ballPosition = this.$refs.ball.getBoundingClientRect();

         // 获取 徽标 在页面中的位置
         const badgePosition = document.getElementById("badge").getBoundingClientRect();
         const xDist = badgePosition.left - ballPosition.left;
         const yDist = badgePosition.top - ballPosition.top;

         el.style.transform =`translate(${xDist}px, ${yDist}px)`;
         el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
         done()
      },
      afterEnter(el){
         /* 
            this.flag=!this.flag
            这句话的第一个功能就是，控制小球的显示和隐藏
            第二个功能：直接跳过后半场动画，让flag标识符直接变为false，

            因为vue 的一个完整的动画是一个过程，vue用钩子函数将这个动画拆分成了两个部分，
            使用flag来标识动画切换的过程，
            整个动画的过程，是从false---> true ---> false

            钩子函数让动画先从false变味了true，但使我们只需要半场动画，并不需要全场动画，
            所以我们的后半场动画，就需要手动的改变flag的状态，来直接跳过，回到动画开始的最初状态
         */
         this.ballFlag = !this.ballFlag
      },
      // 父组件向子组件传值
      getSelectCount(count){
         //这个方法的本质是父组件把这个方法给子组件让它来调用，然后再传递过来一个返回值，所以我们需要定义一个值 count 来接收，
         //当子组件把选中的数量传递给父组件的时候，把选中的值保存在data中，等待一会儿使用。
         this.selectedCount=count;
         console.log('子组件goood_numbox通过 getSelectCount 传递给父组件的值为：'+this.selectedCount)
      }
   },
   components: {
      swiper,
      numbox
   }
}
</script>
<style lang="scss" scoped>
   .goodsinfo-container {
      background-color: #eee;
      overflow: hidden;
      .now_price {
         color: red;
         font-size: 16px;
         font-weight: bold;
      }
      .mui-card-footer {
         display: block;
         button {margin: 15px 0;}
      }
      .ball {width: 15px;height: 15px;border-radius: 50%;background-color: red;position: absolute;z-index: 99;top: 416px;left: 182px;
      }
   }
</style>