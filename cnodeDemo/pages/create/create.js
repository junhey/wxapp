//logs.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    cnodeStatus: false,
    ttype:'',
    title:'',
    content:'',
    items: [
      {name: 'share', value: '分享'},
      {name: 'ask', value: '问答', checked: 'true'},
      {name: 'job', value: '招聘'},
    ]
  },
  onLoad: function () {
    console.log('onLoad');
  },
  send:function(e){
    console.log('send');
    var ApiUrl=Api.topics;
    var data={
      accesstoken:wx.getStorageSync('CuserInfo').accesstoken,
      title:e.detail.value.title,
      tab:this.data.ttype,
      content:e.detail.value.content
    };
    Api.fetchPost(ApiUrl, data,(err, res) => {
      if(res.success){
        wx.navigateTo({
          url: '../index/index'
        });
      }
    });
  },
  radioChange:function(e){
    this.data.ttype=e.detail.value;
  }
})
