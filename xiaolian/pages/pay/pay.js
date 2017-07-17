// pages/pay/pay.js
Page({
  data: {
    integralQRCode: "../image/qr.404.png",
    scoreResult: 0,
    hiddenLoading: true
  },
  bindHomeViewTap: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      hiddenLoading: false
    });
    var scoreArr = wx.getStorageSync('scoreArr');
    var scoreResult = wx.getStorageSync('scoreResult');
    if (scoreArr) {
      that.setData({
        integralQRCode: "https://lite.lianlianchains.com/qrcode/?mobile=" + scoreArr[0] + "&chaincodeID=" + scoreArr[1] + "&width=102&height=102",
        scoreResult: scoreResult,
        hiddenLoading: true
      })
    }
  }

})