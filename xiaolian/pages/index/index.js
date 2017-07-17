//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    hiddenLoading: true,
    integralQRCode: "../../image/qr.404.png",
    patentQRCode: "../../image/qr.404.png",
    userInfo: {},
    balance: 0,
    score: 0,
    scoreB: 0,
    patent: 0,
    patentB: 0
  },
  //分享模块
  onShareAppMessage: function () {
    return {
      title: '小链Lite',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转区块列表页
  bindBlockTap: function () {
    wx.navigateTo({
      url: '../peer/peer'
    })
  },
  //跳转用户注册页
  bindBindTap: function () {
    wx.navigateTo({
      url: '../bind/bind'
    });
  },
  //点击扫码触发的函数
  bindScanTap: function () {
    var that = this;
    if (wx.getStorageSync('mobile') == '') {
      wx.navigateTo({
        url: '../bind/bind'
      });
    }
    if (wx.getStorageSync('mobile') !== '') {
      wx.scanCode({
        success: (res) => {
          var scoreArr = res.result.split("|");
          wx.setStorageSync('scoreArr', scoreArr);
          wx.navigateTo({
            url: '../score/score'
          })

        }
      })
    }

  },
  //二维码图片预览 => jzf
  bindPreviewTap: function () {
    var that = this;
    var onoff = true;
    if (wx.getStorageSync('mobile') !== '') {
      wx.previewImage({
        current: that.data.integralQRCode, // 当前图片的http链接
        urls: [
          that.data.integralQRCode
        ] // 需要预览的图片http链接列表
      })
    } else if (wx.getStorageSync('mobile') == '') {
      wx.navigateTo({
        url: '../bind/bind'
      });
    }

  },
  bindPatentTap: function () {
    wx.showToast({
      title: '暂未开通',
      icon: 'success',
      image: '../../image/toast.png',
      duration: 2000
    })
  },
  onCommenTap: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    //测试数据
    // wx.setStorageSync('mobile', '18611426275');
    //获取数字资产 积分
    var mobile = wx.getStorageSync('mobile');
    if (mobile != '') {
      //获取资产余额
      wx.request({
        url: 'https://lite.lianlianchains.com/chaincode/query/',
        data: {
          callerID: 'zhenghong',
          callerToken: '847768148',
          chaincodeID: '81993fe27bc13aeb9939265e758e8072b24402374b0d264ab21216f989ae29fc',
          args: '["query", "' + mobile + '"]',
          codeLanguage: 'GO_LANG'
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.stopPullDownRefresh();
          that.setData({
            hiddenLoading: true,
            score: res.data.message,
            scoreB: res.data.message / 2,
            balance: res.data.message / 2
          })
        }
      })
    }

    //获取智能合约二维码
    if (mobile != '') {
      that.setData({
        integralQRCode: "https://lite.lianlianchains.com/qrcode/?mobile=" + mobile + "&chaincodeID=81993fe27bc13aeb9939265e758e8072b24402374b0d264ab21216f989ae29fc&width=102&height=102",
        patentQRCode: "https://lite.lianlianchains.com/qrcode/?mobile=" + mobile + "&chaincodeID=1685b5e77273e3db96a6ebba1e0117d39ac0f1388f448e7691680927548d134b&width=102&height=102"
      })
    }
    //关闭下拉刷新
    if (mobile == '') {
      setTimeout(function () {
        wx.stopPullDownRefresh();
      }, 3000)
    }
  },
  //下拉刷新函数
  onPullDownRefresh: function () {
    var that = this;
    that.onCommenTap();
  },
  onLoad: function () {
    var that = this;
    that.onCommenTap();

  }

})
