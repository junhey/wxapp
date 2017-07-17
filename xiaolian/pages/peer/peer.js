// pages/peer/peer.js
Page({
  data: {
    peers: [],
    height: 0,
    blocks: [],
    isBlockShow: true,  //区块显示
    BlockbgColor: "#999999",
    NodebgColor: "f8f8f8",
    // hiddenLoading:false
  },
  //分享模块
  onShareAppMessage: function () {
    return {
      title: '链信息',
      path: "pages/peer/peer",
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  onCommenEvent: function () {
    var that = this
    // hiddenLoading:false;
    // 节点信息
    wx.request({
      url: 'https://lite.lianlianchains.com/network/peers',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          'peers': res.data.peers,
        })
      }
    })

    // 区块信息
    wx.request({
      url: 'https://lite.lianlianchains.com/chain',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          'height': res.data.height - 1
        })

        for (var i = res.data.height - 1, index = 0; i > res.data.height - 5; i-- , index++) {

          wx.request({
            url: 'https://lite.lianlianchains.com/chain/blocks/' + i,
            data: {
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (that.data.blocks.length <= 3) {
                that.data.blocks.push(res.data.stateHash)
                that.setData({
                  'blocks': that.data.blocks,
                  hiddenLoading: true
                })
              }
              if (that.data.blocks.length > 3) {
                wx.stopPullDownRefresh();
              }

            }
          })
        }
      }
    })
    setTimeout(function () {
      that.setData({
        hiddenLoading: true
      })
    }, 8000);
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.onCommenEvent();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.onCommenEvent();
  },
  // 事件处理
  bindBlockTap: function (event) {
    var index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '../block/block?index=' + index
    })
  },
  //显示区块内容隐藏节点内容
  bindBlockNavTap: function (event) {
    var that = this;
    that.setData({
      isBlockShow: true,
      BlockbgColor: "#999999",
      NodebgColor: "#f8f8f8"
    })
  },
  //显示节点内容隐藏区块内容
  bindNodeNavTap: function (event) {
    var that = this;
    that.setData({
      isBlockShow: false,
      BlockbgColor: "#f8f8f8",
      NodebgColor: "#999999"
    })
  }
})