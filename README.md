# 《heroku在线部署》
本demo是用nodejs写的一个小例子，主要演示如何在heroku上部署自己的程序。

## 认识heroku
点击访问[官方网址](https://www.heroku.com/)

**什么是heroku呢？**

heroku是一个paas平台，现在支持多种开发语言环境，并且他有很强大的add-on服务。

**什么是paas？**

Platform as a Service: 平台即服务, 是面向软件开发者的服务, 云计算平台提供硬件, OS, 编程语言, 开发库, 部署工具, 帮助软件开发者更快的开发软件服务. 
类似的pass平台有Google的gae，国内新浪的sae。

好了，其他详细的内容自己可以去查相关的资料。

## 步骤
现在具体讲解我这次的具体操作步骤。

### 准备程序
大家可以clone我上面的程序来进行演示，因主这个主要讲解heroku的部署，所以只是一个静态的页面，就相当于直接写一个html，里面写一个```hello world```

#### 注意：
* heroku上是无法直接部署静态网页，
* 所以程序中不要有html文件，否则会一直push失败，
* 我刚开始就是因为这个，一直push不上去。
* 我这个参考别人的demo用的是ejs来解决。

#### 创建程序步骤
我用是nodejs，这个感觉没必要具体讲解，大致说下步骤，nodejs的环境配置就不说了。

* npm init 创建自己的程序架构
* npm install ejs 替换静态html文件用
* npm install express
* 具体的目录结构参考我的代码吧
* 创建Procfile文件，这个文件是给heroku用的，告诉heroku入口
   * Profile的内容就是指定程序入口，
   * 内容：```web: node app.js```
* 创建app.js，代码如下：
```
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

console.log('the server is started.');
```
* node app.js 测试下是否成功


### 1.注册heroku账户
如果还没有heroku账号，先到[heroku官网](https://www.heroku.com/)上注册下,这个目前的126邮箱不能注册，我用的是qq邮箱。

### 部署到heroku
目前一切准备就绪，可以部署到heroku上了，heroku部署的时候会根据package.json文件来安装需要的模块，所以可以删除自己目录下的node_modules文件夹。

打开控制台窗口，进入程序根目录，先登录heroku ```heroku login```, 执行```heroku create```，在heroku上创建一个仓库，为部署使用

![create](http://img1.ph.126.net/GUHM33Og9viyzeWwFPa74Q==/2608147134219150316.png)

这时已经在你的账号下创建了一个项目，打开heroku网页，刷新下，就可以看到上面创建的项目
![heroku个人项目列表](http://img2.ph.126.net/FySiduq1f0DvtTfaykIV8A==/6632547708352309199.png)

由于现在只是在heroku的服务器上创建了一个仓库，但还没把你的项目添加到git里面，这个和github是一样的，所以现在把你的程序上传到heroku的仓库，它就给你部署了。

打开你heroku上的项目，点击```deploy```tab页，最下面就有操作的相关命令
![deploy](http://img2.ph.126.net/nvNn5gShNuVE1thYTkc8-w==/6632640067326444329.png)

在设置中配置Buildbacks,Buildbacks是配置运行环境，默认创建没指定，所以要设置成对应的运行环境。
![空](http://img0.ph.126.net/GZS9O2tc2AKCpeWFFE77bA==/6632354194305817593.png)

![setted](http://img1.ph.126.net/k_3K4PRzc4njt98tyaUEYQ==/1275363119494209346.png)

目前要做的就是把你的项目上传到heroku的git上。按照网站上提供的命令执行即可。
```
$ cd my-project/     --首先进入你的项目文件夹
$ git init           --创建git相关文件
$ heroku git:remote -a calm-sands-44565  --指定当前项目的远程地址为calm-sands-44565
```
上面命令运行过后，就和heroku上的仓库关联起来了。可以执行```git remote -v```来查看项目的远程地址有几个。
![remote](http://img0.ph.126.net/Bxhof5yIou9XyraqDSChsw==/2595480760267179132.png)

接下来把代码push到heroku上

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
现在部署就完成了，执行push后heroku会自动部署。

在控制台执行```heroku open```命令，则会自动打开浏览器，访问你部署的网站，看到你的内容就说明成功了。

 ### 参考网站
 
 [https://github.com/alsotang/node-lessons/tree/master/lesson12](https://github.com/alsotang/node-lessons/tree/master/lesson12)
 
 [https://yq.aliyun.com/articles/40758](https://yq.aliyun.com/articles/40758)
