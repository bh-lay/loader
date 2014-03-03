#一、简介

##1.1、loader是什么?
loader是一个用于加载项目资源的工具，用于剥离文件间的耦合关系，提高模块加载效率。

##1.2、loader目前有哪儿些特性？

* 单次使用可独立设置文件用例
* 内部支持重复及加载中的文件检测，保证文件的唯一性
* 支持多文件加载

##1.3、说明

* 受困于同一文件的异步加载完成之前，再次发起一次同步的请求，逻辑上的问题尚未理清，目前仅支持异步加载
* 细节实现依赖于[jquery](http://jquery.com)

##1.4、问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件：bh-lay#126.com, 把#换成@
* QQ：279708284
* weibo: [@剧中人](http://weibo.com/bhlay)


##1.5、关于作者

```javascript
  var ihubo = {
    nickName  : "剧中人",
    site : "http://bh-lay.com/"
  }
```

#二、使用
##2.1、定义用例方式
```javascript
    //实例化loader对象，并定义所需文件
    var require = new loader({
        'pop' : '/js/UI/pop.js',
    	'lofox' : '/js/util/lofox.js',
		'publish' : '/js/publish.js'
	});
    //加载所需文件并执行相关操作
    require.load('lofox,pop',function(){
        //do something...
    });
    //加载所需文件并执行相关操作
    require.load('publish',function(){
        //do something...
    });
```
##2.2、指定url方式
```javascript
    //实例化loader对象
    var require = new loader();
    //按地址加载文件并执行相关操作
    require.load('/js/publish.js',function(){
        //do something...
    });
```
##2.3、混合方式
```javascript
    //实例化loader对象，并定义所需文件
    var require = new loader({
        'pop' : '/js/UI/pop.js',
    	'lofox' : '/js/util/lofox.js'
	});
    //加载所需文件并执行相关操作
    require.load('lofox,pop',function(){
        //do something...
    });
    //按地址加载文件并执行相关操作
    require.load('/js/publish.js',function(){
        //do something...
    });
```
