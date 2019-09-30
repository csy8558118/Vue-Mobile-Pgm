<template>
   <div class="cmt-container">
      <h3>发表评论{{id}}</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model='msg'></textarea>
    <mt-button type="primary" size="large"  @click='postComment'>发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item , i) in commentList" :key="item.add_time">
        <div class="cmt-title">
          第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
         {{item.content ==='undefined'?'此用户很懒，什么都没有留下':item.content}}
        </div>
      </div>
    </div>
    <mt-button plain type="danger" size="large" @click='getMore'>加载更多</mt-button>
   </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
   data(){
      return{
         commentList:[],
         pageindex:1,
         msg:'',
      }
   },
   created(){
      this.getComments();
   },
   methods:{
      //获取评论
      getComments(){
         //请求数据的接口中包含有id，而id是从父组件传递过来的值，所以要用到父组件向子组件传值，传的是简单的数据，所以可以用简单的数据绑定就可以了
         //找到引用子组件的父组件，在子组件的标签上，绑定数据，再在子组件上，通过props属性，接收传过来的值 
         this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(result=>{
            // console.log(result)
            if(result.body.status===0){
               // this.commentList = result.body.message
               //每当获取新数据的时候，不要把老的数据清空，而是应该将老的数据拼接在新的数据的后面，这样就是一个新的数组
               this.commentList =this.commentList.concat(result.body.message) 
               Toast("获取评论内容成功！")
            }else{
               Toast("获取评论内容失败！")
            }
         })
      },
      //加载更多
      getMore(){
         this.pageindex++;
         this.getComments();
      },
      //发表评论
      postComment(){
         //检测是否为空，如果为空，提示不能输入，然后return ，结束这个方法，不再继续向下执行
         if(this.msg.trim().length===0){
            return Toast('评论不能为空！')
         }
         //post的参数
         //1.参数一请求的URL地址
         //2.提交给服务器的数据对象 { content:this.meg }
         //3. 定义提交时候的表单中的数据，{ emulateJSON:true(这个配置可以全局配置好) }
         this.$http.post('api/postcomment/' + this.$route.params.id, {content:this.msg.trim()}).then(result=>{
            if(result.body.status===0){
               //拼接出一个评论的对象
               var cmt = { user_name:'匿名用户', add_time:Date.now(), content:this.msg.trim()};
               this.commentList.unshift(cmt);
               this.msg='';
            }else{
               Toast('评论出错！')
            }
         })
      }
   },
   //父组件传递过来的数据
   props:['id']
}
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>