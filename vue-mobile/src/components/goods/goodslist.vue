<template>
   <div class="goods-list">
      <!-- 我们可以使用router-link的方式，也可以使用另外一种方式， -->

      <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodinfo/'+ item.id" tag='div'>
         <img :src="item.img_url" alt="" >
         <h1 class="title">{{ item.title }}</h1>
         <div class="info">
         <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
         </p>
         <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
         </p>
         </div>
      </router-link> -->

    <!-- 使用点击事件 调用事件进行跳转，跳转的时候要加id进行区分 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click='togoodsinfo(item.id)'>
      <img :src="item.img_url" alt="" >
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click='getmore'>加载更多</mt-button>
   </div>
</template>
<script>
export default {
   data(){
      return{
         goodslist:[],
         pageindex:1,
      }
   },
   created(){
      this.getGoodsList();
   },
   methods:{
      //获取商品列表
      getGoodsList(){
         this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
            if(result.body.status===0){
               this.goodslist= this.goodslist.concat(result.body.message);
            }else{
               Toast('获取数据失败！')
            }
         })
      },
      //获取更多
      getmore(){
         this.pageindex++;
         this.getGoodsList()
      },
      //使用js的形式进行路由导航
      togoodsinfo(id){

         console.log(this)
         //我们通过consol.log(this)，可以打印出组件的内容，其中包含有几个我们能用得到的方法，back(),forword(),go()
         //可以通过上述几个方法，实现页面的前后跳转和指定跳转。

         //我们无法使用window.onload来进行页面的跳转，因为在vue中我们尽量不这么做，这是属于BOM 的操作。
         //vue-router给我们提供了一个方法 ，编程式导航
         // 注意：一定要区分 this.$route 和this.$router 这两个对象
         //this.$route 是路由参数对象，所有路由中的参数，params，query 都属于他
         //this.$router 是一个路由导航对象，用他可以方便的使用JS代码，实现路由的前进，后退，跳转到新的url地址

         // 1.最简单的跳转方式
         // this.$router.push('/home/goodinfo/'+id)
         // 2.传递对象
         // this.$router.push({path:'/home/goodinfo/'+id});
         // 3.传递命名的路由
         this.$router.push({name:'goodinfo',params:{id}});
         
         
      }
   }
}
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>