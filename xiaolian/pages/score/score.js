// pages/score/score.js
var utils = require('../../utils/util');
Page({
  data: {
    hiddenLoading: true,
    chaincodeID: '',
    tomobile: '',
    tip: '',
    tipflag: false,
    integralQRCode: "../../image/qr.404.png"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var scoreArr = wx.getStorageSync('scoreArr');
    if (scoreArr) {
      that.setData({
        integralQRCode: "https://lite.lianlianchains.com/qrcode/?mobile=" + scoreArr[0] + "&chaincodeID=" + scoreArr[1] + "&width=202&height=202",
        tomobile: scoreArr[0],
        chaincodeID: scoreArr[1]
      })
    }

  },
  bindSubmitTap: function (event) {
    var that = this
    var scoreArr = wx.getStorageSync('scoreArr');
    var mobile = wx.getStorageSync('mobile');
    var score = event.detail.value.score;
    var pw = event.detail.value.pw

    if (score == '' || pw == '') {
      that.setData({
        tipflag: true,
        tip: '请填写完整信息'
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)

      return
    }

    if (score <= 0) {
      that.setData({
        tipflag: true,
        tip: '交易积分必须大于0'
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)

      return
    }

    if (pw != wx.getStorageSync('pw')) {
      that.setData({
        tipflag: true,
        tip: '交易密码错误'
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)

      return
    }
    that.setData({
      hiddenLoading: false
    });
    wx.request({
      url: 'https://lite.lianlianchains.com/chaincode/invoke/',
      data: {
        callerID: 'zhenghong',
        callerToken: '847768148',
        chaincodeID: '81993fe27bc13aeb9939265e758e8072b24402374b0d264ab21216f989ae29fc',
        args: '["transfer", "' + mobile + '", "' + scoreArr[0] + '","' + score + '"]',
        codeLanguage: 'GO_LANG'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        wx.setStorageSync('scoreResult', score);

        if (res.data.result == "error") {
          that.setData({
            hiddenLoading: true
          })
          if (res.data.exceptionMessage == "Balance not enough") {
            that.setData({
              tipflag: true,
              tip: '积分余额不足'
            })

            setTimeout(function () {
              that.setData({
                'tipflag': false
              })
            }
              , 3000)
          }

          return
        }
        wx.request({
          url: 'https://lite.lianlianchains.com/wx/send',
          data: {
            "openid": wx.getStorageSync('user').openid,
            "templateid": "y6FU6brbCL-oo7yfJCi55Cxb5LIWV-LhLZ_66feKrJ8",
            "page": "pages/index/index",
            "formid": event.detail.formId,
            "data": {
              "keyword1": {
                "value": score + " S",
                "color": "#000000"
              },
              "keyword2": {
                "value": utils.formatTime(new Date()),
                "color": "#333333"
              },
              "keyword3": {
                "value": "积分交易",
                "color": "#333333"
              },
              "keyword4": {
                "value": res.data.transactionID,
                "color": "#333333"
              }
            },
            "emphasis_keyword": "keyword1.DATA"
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              hiddenLoading: true
            })
            wx.navigateTo({
              url: '../pay/pay'
            })
          }
        })

      }
    })

  }

})