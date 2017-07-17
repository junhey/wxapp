// pages/bind/bind.js
Page({
  data: {
    hiddenLoading: true,
    codestate: '发送',
    codeflag: true,
    mobile: '',
    code: '',
    pw: '',
    pwc: '',
    tipflag: false,
    tip: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  bindCodeTap: function (event) {

    var that = this
    var mobile = that.data.mobile

    if (mobile != '' && that.data.codeflag) {

      that.data.codeflag = false

      var currentTime = 60
      var interval = setInterval(function () {
        currentTime--;
        that.setData({
          codestate: '(' + currentTime + ')s'
        })

        if (currentTime == 0) {
          clearInterval(interval)

          that.setData({
            'codestate': '发送'
          })
          that.data.codeflag = true
        }
      }, 1000)

      // 发送验证码
      wx.request({
        url: 'https://lite.lianlianchains.com/sms/send',
        data: {
          mobile: mobile
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          if (res.data.code != 200) {

            that.setData({
              'tipflag': true
            })

            that.setData({
              'tip': res.data.msg
            })

            setTimeout(function () {
              that.setData({
                'tipflag': false
              })
            }
              , 3000)

          }
        }
      })

    }

  },
  bindMobileChange: function (event) {
    this.data.mobile = event.detail.value
  },
  bindSubmitTap: function (event) {
    var that = this

    var mobile = event.detail.value.mobile
    var code = event.detail.value.code
    var pw = event.detail.value.pw
    var pwc = event.detail.value.pwc

    if (mobile == '' || code == '' || pw == '' || pwc == '') {
      that.setData({
        'tip': '信息请填写完整'
      })

      that.setData({
        'tipflag': true
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)

      return
    }

    if (pw != pwc) {

      that.setData({
        'tip': '密码不一致'
      })

      that.setData({
        'tipflag': true
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)

      return
    }

    // 验证码校验
    wx.request({
      url: 'https://lite.lianlianchains.com/sms/verify',
      data: {
        mobile: mobile,
        code: code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        if (res.data.code != 200) {
          that.setData({
            'tipflag': true
          })

          that.setData({
            'tip': "请输入正确的验证码"
          })

          setTimeout(function () {
            that.setData({
              'tipflag': false
            })
          }
            , 3000)

        } else {
          that.setData({
            hiddenLoading: false
          });
          wx.setStorageSync('mobile', mobile);
          wx.setStorageSync('pw', pw);
          wx.request({
            url: 'https://lite.lianlianchains.com/chaincode/invoke/',
            data: {
              callerID: 'zhenghong',
              callerToken: '847768148',
              chaincodeID: '81993fe27bc13aeb9939265e758e8072b24402374b0d264ab21216f989ae29fc',
              args: '["recharge","' + mobile + '", "100"]',
              codeLanguage: 'GO_LANG'
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.setData({
                hiddenLoading: true
              });
              if (res.data.result == "error") {
                that.setData({
                  'tip': "网络异常"
                })

                setTimeout(function () {
                  that.setData({
                    'tipflag': false
                  })
                }
                  , 3000)

                return;
              }
              wx.redirectTo({
                url: '../index/index'
              })

            }
          })
        }
      }
    })

  }
})