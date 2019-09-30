//入口文件
import Vue from 'vue'

/* 
   路由部分
   1. import 导入路由组件,再安装路由(这样项目就能启用路由了)
   2. use 使用路由模块
   3. 导入自己的路由模块（单独定义的router.js，写成一个单独的文件，便于保存和管理）
*/
import VueRouter from'vue-router'
Vue.use(VueRouter)
import router from './router.js'

/* 
   导入ajax组件 vue-resource
   1. import 导入vue的ajax组件 vue-resource,再安装
   2. use 使用resource模块
   3. root 全局配置根路径， 我们要在安装好路由组件之后，才能设置全局的根路径，而且不能在接口地址前带/
   4. 全局设置 post 时候表单数据格式组织形式  application/x-www-form-urlencoded
*/
import VueResource from'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true;

/* 
   定义全局过过滤器
   1.function中有参数，第一个参数是已知的，就是管道符 | 前面的值，将要格式化的值。
*/
Vue.filter('dateFormat',function(dataStr,pattern='yyyy-mm-dd hh:mm:ss'){
   //根据给定的时间字符串，得到特定的时间
   let dt = new Date(dataStr);
   //格式化一下时间和日期的样式,将不足10的数字，加上0；
   let change = function (i){
      return i < 10 ? `0${i}` : i
   }
   
   //yyyy-mm-dd
   let y =  dt.getFullYear();
   let m = change(dt.getMonth() + 1);
   let d = change(dt.getDate());

   //return 得到的格式化字符串
   //return `${y}-${m}-${d}`

   //dateFormat('YYYY-mm-dd')如果过滤器中不传入任何参数，那么形参的值是undefined，undefined是无法调用toLowerCase的值的
   //所以，在if语句中，判断有没有这个值
   if(pattern && pattern.toLowerCase()==='yyyy-mm-dd'){
      return `${y}-${m}-${d}`
   }else{
      let h = change(dt.getHours());
      let mm = change(dt.getMinutes());
      let s = change(dt.getSeconds()); 
      return `${y}-${m}-${d} ${h}:${mm}:${s}`
   }
})


/*
   导入MUI的样式
*/
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

/* 
   导入element-ui
*/
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

/* 
   按需导入Mint-UI中的组件
*/
// import { Header, Swipe, SwipeItem, Button, Lazyload, } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

/*
   安装vue-preview 缩略图插件
*/
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

/* 
   使用vuex 
      1.导入包，注册vuex到vue中
      2.new Vuex.Store()实例，得到一个仓储对象
      3.将vuex创建好的store挂载到vm实例上，
   在组件中，如果想要访问store中的数据，  只能通过this.$store.state.属性名称 来访问；
   只要挂载到了vm实例上，任何组件都能使用store来存储数据
*/
import Vuex from 'vuex'
Vue.use(Vuex)
//每次进入页面的时候，需要先调用本地的存储数据，查找是否有这个数据存在，如果不存在，直接置空，存在的话，赋值给store中的car，这样就可以做到同步数据了
var car = JSON.parse(localStorage.getItem('car')||'[]');
var store = new Vuex.Store({
   // this.$store.state.*** 可以把state想象成组件中的data，专门用来存储数据 
   state:{
      // 将购物车中商品的数据，用一个数组存起来，每一个商品都是一个对象，在这个数组中，存储所有的对象。
      // 在car中，我们可以暂时将商品对象设计成如下：{id:商品的id, count:商品的数量,price:商品的价格,selected:false(商品在购物城中是否被选中),}
      car:car,
   },

   // this.$store.commit('方法名称',"按需传入唯一的参数")
   mutations:{
      //点击添加进购物车，把接收到的商品信息保存到state的car中
      addToCar(state,goodinfo){
         //分析: 
         //    如果在car数组中，有这么个id存在，那么就说明存在了这个商品，只需要直接修改数量就ok，
         //    如果数组中不存在，直接将这个商品添加到car中
         // 假设没有在购物车中找到该商品
         var flag = false;
         state.car.map(item=>{
            if(item.id==goodinfo.id){
               item.count += parseInt(goodinfo.count);
               flag = true;
               return true; 
            }
         })
         //如果循环完毕，最后得到的商品还是false，那么就把这个商品追加到car数组中
         if(!flag){
            state.car.push(goodinfo)
         }
         //每当更新完car之后，就把car数组存放到本地的localStorage中去
         localStorage.setItem('car',JSON.stringify(state.car))
      },
      //在购物车页面修改商品信息
      updateGoodsinfo(state,goodinfo){
         //分析：我们需要将购物车页面中商品数量的值，设置为最新的goodsinfo的值，
         //然而我们在购物车计数器组件中，只能拿到改变的数值,这不够，还需要再加上一个id，才能知道是哪个是哪个商品，
         //所以在绑定值的时候，也要把id绑定到numbox上传递过去
         state.car.map(item=>{
            if(item.id==goodinfo.id){
               item.count= parseInt(goodinfo.count);
               return true;
            }
         })
         localStorage.setItem('car',JSON.stringify(state.car))
      },
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      removeFormCar(state, id) {
         var idx =state.car.findIndex((item, i) => {
           if (item.id == id) {
             return i;
           }
         })
         state.car.splice(idx, 1)
         // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
         localStorage.setItem('car', JSON.stringify(state.car))
       },
      //更新seclected的状态
      // 有个问题，findIndex的时候，第一个数据会出问题，暂时无法解决
      updateGoodsSelected(state, info) {
         console.log(info)
         state.car.some(item => {
            if (item.id == info.id) {
              item.selected = info.selected
            }
          })
         // 把最新的 所有购物车商品的状态保存到 store 中去
         localStorage.setItem('car', JSON.stringify(state.car))
      }
   },

   //this.$store.getters.***
   getters:{
      //获取所有的count,返回给调用者
      getAllCount(state){
         var c=0;
         state.car.forEach(item=>{
            c += item.count
         })
         return c;
      },
      //获取所有的商品的id，然后再获取商品的数量，组成键值对，返回给调用者
      getGoodsCount(state){
         var o = {};
         state.car.forEach(item=>{
            o[item.id]=item.count;
         })
         return o;
      },
      //获取所有的商品的id，然后再获取所有商品的选中状态，组成键值对，返回给调用者
      getGoodSelected(state){
         var o = {};
         state.car.forEach(item=>{
            o[item.id]=item.selected;
         })
         return o;
      },
      //获取当前state中的car中所有商品的selected，按照selected的属性，来进行筛选和操作，将计算得到的值，返回给调用者
      getAllCountAndSelected(state){
         //定义一个固定的数据格式，用来返回给调用者
         var o= {
            count:0,//勾选的数量
            allPrice:0,//总价
         }
         state.car.forEach(item=>{
            if(item.selected==true){
               o.count+=item.count;
               o.allPrice+=item.price * item.count;
            }
         })
         return o;
      }
   }
})




/* 
   导入 App根组件 
*/
import app from './App.vue'
var vm = new Vue({
   el:'#app',
   render:c=>c(app),
   //将路由挂载到vue实例上
   router:router,
   //将store挂载到vue实例上
   store:store,
})