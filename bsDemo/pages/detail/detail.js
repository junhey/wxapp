Page( {
    data: {
        // text:"这是一个页面"
        url: "",
        width: "",
        height: ""
    },
    onLoad: function( options ) {
        // 页面初始化 options为页面跳转所带来的参数
        var url = options.url;
        var width = options.width;
        var height = options.height;
        console.log( "接收的数据为；" + url + "\n" + width + "\n" + height );
        this.setData( {
            url: url,
            width: width,
            height: height
        });
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})