// pages/block/block.js
var util = require('../../utils/util.js')
Page({
  data: {
    hiddenLoading: true,
    index: 0,
    block: {},
    date: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var index = options.index
    that.setData({
      'index': index,
      hiddenLoading: false
    })
    // 区块信息
    wx.request({
      url: 'https://lite.lianlianchains.com/chain/blocks/' + index,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.transactions) {
          var s = res.data.transactions[0].timestamp.seconds
          var date = new Date(s * 1000);
          that.setData({
            'date': util.formatTime(date)
          })
        }
        that.setData({
          hiddenLoading: true,
          'block': res.data
        })
      }
    })

  }
})