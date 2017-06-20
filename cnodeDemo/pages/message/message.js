//logs.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    messageData:{},
    cnodeStatus:false
  },
  onLoad: function () {
    this.fetchData();
  },
  fetchData:function(){
    var that=this;
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    if(!accesstoken){//未登录
      that.setData({ cnodeStatus: true });
      return;
    }else{//已登录
      that.setData({cnodeStatus: false});
      var messagesUrl=Api.messages+'?accesstoken='+accesstoken;
      Api.fetchGet(messagesUrl,(err,res)=>{
        console.log(res.data);
        that.setData({messageData:res.data});
      });
    }
  },
  login:function(){
    wx.navigateTo({
      url: '../login/login'
    });
  },
})
