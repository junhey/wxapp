// pages/user/user.js
 
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data:{
    userData:{},
    activeIndex: 0,
    hidden: false
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    that.fetchData(options.loginname);
  },
  fetchData:function(loginname){
    var that=this;
    var userUrl=Api.user+'/'+loginname;
    Api.fetchGet(userUrl,(err,res)=>{
      res.data.create_at = util.getDateDiff(new Date(res.data.create_at));
      res.data.recent_replies = res.data.recent_replies.map(function (item) {
          item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
          return item;
      });
      res.data.recent_topics = res.data.recent_topics.map(function (item) {
          item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
          return item;
      });
      that.setData({userData:res.data});
      that.setData({hidden:true});
    });
  },
  onTapTag:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeIndex: index,
    });
  }
})