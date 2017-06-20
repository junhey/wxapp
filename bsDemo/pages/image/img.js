//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    windowHeight: 654,
    maxtime: "",
    isHiddenLoading: false,
    isHiddenToast: true,
    dataList: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.setData( {
      windowHeight: wx.getStorageSync( 'windowHeight' )
    });

    this.requestData( "newlist" );

  },
  lookBigPic: function( e ) {
    var url = e.currentTarget.dataset.url;
    var width = e.currentTarget.dataset.width;
    var height = e.currentTarget.dataset.height;
    console.log( url + "\n" + width + "\n" + height );
    wx.navigateTo( {
      url: "../detail/detail?url=" + url + "&width=" + width + "&height=" + height,
      success: function( res ) {
        console.log( res )
      },
      fail: function( err ) {
        console.log( err );
      }
    });
  },
  requestData: function( a ) {
    var that = this;
    //  请求数据
    wx.request( {
      url: "http://api.budejie.com/api/api_open.php",
      data: {
        a: a,
        c: "data",
        maxtime: that.data.maxtime,
        type: 10
      },
      method: "GET",
      success: function( res ) {
        console.log( res );
        that.setData( {
          isHiddenLoading: true,
          dataList: res.data.list,
          maxtime: res.data.info.maxtime,
          isHiddenToast: false
        });
        console.log( "成功了" );
      },
      fail: function() {
        console.log( "失败了" );
      }
    });
  },
  // 下拉刷新
  upper: function( e ) {
    console.log( "下拉刷新了" );
    this.requestData( "newlist" );
  },
  // 加载 
  lower: function( e ) {
    console.log( "加载更多了" );
    this.requestData( "list" );
  },
  closeToast: function( e ) {
    this.setData( {
      isHiddenToast: true
    });
  }
})
