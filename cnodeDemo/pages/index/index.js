//index.js
//
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    cnodeStatus:false,
    hidden: false,
    userData:{},
    activeIndex: 0
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    if(!accesstoken){
      that.setData({ cnodeStatus: true });
      return;
    }else{
      that.setData({hidden: true,cnodeStatus: false});
      that.fetchData(wx.getStorageSync('CuserInfo').loginname);
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
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
  },
  login:function(){
    wx.navigateTo({
      url: '../login/login'
    });
  },
  logout:function(){
    wx.removeStorage('CuserInfo');
    wx.navigateTo({
      url: '../topics/topics'
    });
  }
})
