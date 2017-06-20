Page({
    data: {
        dataList:[],
        // text:"这是一个页面"
        isHiddenLoading: false,
        isHiddenToast: true,
        isHiddenModal: true,
        maxTime: ""
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.requestData("newlist");
    },
    requestData: function (a) {
        var that = this;
        wx.request({
            url: 'http://api.budejie.com/api/api_open.php',
            data: {
                a: a,
                c: "data",
                maxTime: that.maxTime,
                type:'41'
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
                    console.log(res.data.list);
                    that.setData({
                        dataList:that.data.dataList.concat(res.data.list)
                    });
            },
            fail: function () {
                that.setData({
                    isHiddenModal: false
                });
            },
            complete: function () {
                that.setData({
                    isHiddenLoading: true,
                    isHiddenToast: false
                });
            }
        })
    },
    closeToast:function(){
        this.setData({
            isHiddenToast:true
        });
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})