//首先引入路由 
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photos/photolist.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodinfo from './components/goods/goodinfo.vue'
import goodsdesc from './components/goods/goodsdesc.vue'
import goodscomment from './components/goods/goodscomment.vue'
  

//其次创建路由对象 
var router = new VueRouter({
   //router对象中存在几个参数，
   //routes参数配置路由规则，这里，routes不要发生拼写错误
   routes: [
      //为了能让我们的首页可以在没有/home的情况下仍旧是首页的内容，可以做一个路由重定向： redirect
      {path:'/', redirect: '/home'},
      {path:'/home', component: HomeContainer},
      {path:'/member', component:MemberContainer},
      {path:'/shopcar', component:ShopcarContainer},
      {path:'/search', component: SearchContainer},
      {path:'/home/newslist', component:newslist},
      {path:'/home/newsinfo/:id', component:newsinfo},
      {path:'/home/photolist', component:photolist},
      {path:'/home/photoinfo/:id', component:photoinfo},
      {path:'/home/goodslist', component:goodslist},
      {path:'/home/goodinfo/:id', component:goodinfo, name:'goodinfo'},
      {path:'/home/goodsdesc/:id', component:goodsdesc, name:'goodsdesc'},
      {path:'/home/goodscomment/:id', component:goodscomment, name:'goodscomment'},
   ],
   // linkActiveClass 设置路由匹配时对应的类样式
   // 如下做法，可以覆盖默认路由的类，默认的类叫做 router-link-active
   linkActiveClass:'mui-active'


})
//最后，把路由对象暴露出去 
export default router