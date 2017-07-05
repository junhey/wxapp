# 微信小程序知识总结及案例集锦
>微信小程序的发展会和微信公众号一样，在某个时间点爆发

### 学习路径

1. 微信小程序最好的教程肯定是官方的文档啦，点击这里直达 *[微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)*

2. 认真跟着文档看一遍，相信有vue前端经验的看下应该就能上手了，然后安装 *[微信小程序开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)*

3. 新建一个quick start项目，了解代码结构，这里附上整个quick start代码。

4. 然后就拿个顺手的api练练手，这里附上[cnode代码](https://github.com/junhey/wxapp/tree/master/cnodeDemo)，跟着做完差不多就算入门了。

5. 入门之后就是看其他项目的实现了，这里会附上[案例集锦](https://github.com/junhey/wxapp#案例集锦)，一些github的案例。


### 知识总结

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
![Page 实例的生命周期](https://mp.weixin.qq.com/debug/wxadoc/dev/image/mina-lifecycle.png)


#### 组件

- 基本：view,text
- 表单：button,input,radio,slider
- 媒体：image,video,audio,canvas
- 模态：action-sheet,modal,toast,loading
- 容器：swiper,scroller
- 导航：navigator,tabbar

### 小程序开发踩坑记录

- 基本的防踩坑[Q&A](https://mp.weixin.qq.com/debug/wxadoc/dev/qa.html)

- 最佳防踩坑的方式就是看这个[微信小程序常见FAQ](https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=&docid=2fcdb7794d48c59f7624f53e94d0ae22)

- 好友坑过的[开发者社区已解决问题](https://developers.weixin.qq.com/home?tab=1&labels=&lang=zh_CN&token=)


1. 小程序页面空白
    - css兼容性问webkit内核
    - lineShopId长度太长，字符转数字Number
    - post请求参数加上encodeURIComponent解析字符串
2. header要设置正确
    - get "content-type":'application/json'
    - post "content-type":'application/x-www-form-urlencoded'
    - content-Type:application/x-www-form-urlencoded,application/json
3. bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡
4. image背景图片地址必须是url或者base64/本地资源无法通过 css 获取 可以使用网络图片，或者 base64，或者使用 <image/> 标签
5. 使用竖向滚动时，需要给scroll-view一个固定高度，通过 WXSS 设置 height。如果scroll-view高度设置为100%,则不能触发上拉刷新和下拉加载事件......
6. App() 小程序注册入口，全局唯一。App()用来注册一个小程序，全局只有一个，全局的数据也可以放到这里面来操作。
    ```
    // 注册微信小程序，全局只有一个
    let appConfig = {
        // 小程序生命周期的各个阶段
        onLaunch: function(){},
        onShow: function(){},
        onHide: function(){},
        onError: function(){},
    
        // 自定义函数或者属性
        ...
    };
    App(appConfig);
    
    // 在别的地方可以获取这个全局唯一的小程序实例
    const app = getApp();
    ```
    小程序并没有提供销毁的方式，所以只有当小程序进入后台一定时间、或者系统资源占用过高的时候，才会被真正的销毁。
7. Page() 页面注册入口。Page()用来注册一个页面，维护该页面的生命周期以及数据。
```
// 注册微信小程序，全局只有一个
let pageConfig = {
    data: {},
    // 页面生命周期的各个阶段
    onLoad: function(){},
    onShow: function(){},
    onReady: function(){},
    onHide: function(){},
    onUnload: function(){},
    onPullDownRefresh: function(){},
    onReachBottom: function(){},
    onShareAppMessage: function(){},

    // 自定义函数或者属性
    ...
};
Page(pageConfig);

// 获取页面堆栈，表示历史访问过的页面，最后一个元素为当前页面
const page = getCurrentPages();
```
8. {{}} 不能执行方法，只能处理简单的运算如 “+ - * /”，比如遇到遍历list，每个item的金额需要格式化，只能在js里预先格式化好再setData一遍( ╯□╰ )
9. 数字键盘用 type="digit"
10. 禁止页面下拉需要设置 "disableScroll": true 


### 案例集锦

> tip：从案例里可以看到很多其他小程序实现的方式，多多看代码

- 官方demo★★★★★  官方demo可以看看布局啥的，实现啥的
https://mp.weixin.qq.com/debug/wxadoc/dev/demo.html

- 官方quick start★★★★★  官方的小程序，可以自己改动看看效果
https://github.com/junhey/wxapp/tree/master/quickStart

- *cnodejs* ★★★★ 自己做的第一款小程序，基本上覆盖小程序的基本操作，推荐通过cnodejs的api来实践开发小程序
https://github.com/junhey/wxapp-cnode

- 石头剪刀布★★★★  腾讯云团队出品，里面有websocket的使用
https://github.com/CFETeam/weapp-demo-websocket

- v2ex ★★★
https://github.com/liuyugang123/V2EX

- 精简版百思不得姐 ★★★
https://github.com/shuncaigao/BS

- 电影推荐 ★★★
https://github.com/liuyugang123/movie

- 计算器 ★★★
https://github.com/dunizb/wxapp-sCalc

- 豆瓣图书 ★★★
http://www.jianshu.com/p/c35084200470

- 天气 ★★★
http://swiftcafe.io/2016/10/03/wx-weather-app/
https://github.com/liuyugang123/Weather

- 空气质量查询 ★★★
http://blog.csdn.net/yulianlin/article/details/52692066

- github客户端 ★★★
https://blog.zhengxiaowai.cc/post/weapp-demo.html

- 知乎日报 ★★★
https://github.com/liuyugang123/zhihuAPP
http://www.apkbus.com/forum.php?mod=viewthread&tid=268626&extra=page%3D1%26filter%3Dsortid%26sortid%3D12

### 更多

持续踩坑中...

后续会进行不断更新，订阅请点watch，收藏请点star，欢迎开[issues](https://github.com/junhey/wxapp/issues/new)来提问

