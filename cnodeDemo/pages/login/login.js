// pages/login/login.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');


Page({
  data: {
    loading: false,
    accesstoken: "",
    error: ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  bindKeyInput: function(e) {
    this.setData({
      accesstoken: e.detail.value
    })
  },
  // 验证token(登录)
  isLogin: function() {
    var that = this;
    var accesstoken = that.data.accesstoken;
    var ApiUrl = Api.accesstoken;

    if(accesstoken === "") return;

    that.setData({ loading: true });

    Api.fetchPost(ApiUrl, { accesstoken:accesstoken }, (err, res) => {
      if(res.success){
        var CuserInfo = {
          accesstoken: accesstoken,
          id: res.id,
          loginname: res.loginname,
          avatar_url: res.loginname
        };
        console.log(CuserInfo)
        wx.setStorageSync('CuserInfo', CuserInfo);
        setTimeout(function(){
          that.setData({ loading: false });
          wx.navigateBack();
        },3000);

      }else{
        that.setData({ error: res.error_msg });
        that.setData({ loading: false });
        setTimeout(function(){
          that.setData({ error: "" });
        },2000);
      }
    })
  }
})