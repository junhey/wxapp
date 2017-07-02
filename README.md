# wxapp
微信小程序知识总结及案例集锦

1. 微信小程序最好的教程肯定是官方的文档啦，点击这里直达 *[微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)*

2. 认真跟着文档看一遍，相信有vue前端经验的看下应该就能上手了，然后安装 *[微信小程序开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)*

3. 新建一个quick start项目，了解代码结构，这里附上整个quick start代码。

4. 然后就拿个顺手的api练练手，这里附上cnode代码，跟着做完差不多就算入门了。

5. 入门之后就是看其他项目的实现了，这里会附上案例集锦，附上一些github的案例。


## 知识总结

> tip：看到了另一份[W3CSchool整理的文档](http://www.w3cschool.cn/weixinapp/)，可以结合官方文档一起看

#### 目录结构介绍

- app.js — 对本页面的窗口表现进行配置。
- app.json — 对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。
- app.wxss — 接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成。

#### 页面生命周期

1. 小程序注册完成后，加载页面，触发onLoad方法。
2. 页面载入后触发onShow方法，显示页面。
3. 首次显示页面，会触发onReady方法，渲染页面元素和样式，一个页面只会调用一次。
4. 当小程序后台运行或跳转到其他页面时，触发onHide方法。
5. 当小程序有后台进入到前台运行或重新进入页面时，触发onShow方法。
6. 当使用重定向方法wx.redirectTo(OBJECT)或关闭当前页返回上一页wx.navigateBack()，触发onUnload

常规页面A：onLoad()-->onShow()-->onReady()-->onHide()-->onUnload()
释义：
- onLoad()：监听页面加载，一个页面只会调用一次
- onShow()：监听页面显示，每次打开页面都会调用一次
- onReady()：监听页面初次渲染完成，一个页面只会调用一次，代表页面加载完毕，视图层和逻辑层可进行交互
- onHide()：监听页面隐藏，当页面被覆盖或进入后台执行
- onUnload()：监听页面卸载，当页面被关闭或内存不足主动销毁页面

wx.navigateTo跳转状态下，页面A和页面B的生命周期逻辑
1. 进入A页面：A执行onLoad()-->onShow()-->onReady()；
2. A页面navigateTo B页面：A执行onHide()，B执行onLoad()-->onShow()-->onReady()；
3. B页面返回A页面：B执行onUnload()，A执行onReady()；
4. 退出A页面：A执行onUnload()。
```
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
```

#### 组件

- 基本：view,text
- 表单：button,input,radio,slider
- 媒体：image,video,audio,canvas
- 模态：action-sheet,modal,toast,loading
- 容器：swiper,scroller
- 导航：navigator,tabbar



## 案例集锦

> tip：从案例里可以看到很多其他小程序实现的方式，多多看代码

- 官方demo
https://mp.weixin.qq.com/debug/wxadoc/dev/demo.html

- 官方quick start
https://github.com/junhey/wxapp/tree/master/quickStart

- cnodejs
https://github.com/junhey/wxapp-cnode

- v2ex
https://github.com/liuyugang123/V2EX

- 精简版百思不得姐
https://github.com/shuncaigao/BS
https://github.com/liuyugang123/BaisiSister

- 电影推荐
https://github.com/liuyugang123/movie


- 计算器 
https://github.com/dunizb/wxapp-sCalc

- 豆瓣图书 
http://www.jianshu.com/p/c35084200470

- 天气 
http://swiftcafe.io/2016/10/03/wx-weather-app/
https://github.com/liuyugang123/tianqi
https://github.com/liuyugang123/Weather

- 空气质量查询 
http://blog.csdn.net/yulianlin/article/details/52692066

- github客户端 
https://blog.zhengxiaowai.cc/post/weapp-demo.html

- 知乎日报 
https://github.com/liuyugang123/zhihuAPP
http://www.apkbus.com/forum.php?mod=viewthread&tid=268626&extra=page%3D1%26filter%3Dsortid%26sortid%3D12



