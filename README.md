# vue-webApp-eleDemo

学习Vue，仿写饿了么app的demo

## 使用方法

下载

    git clone ###
    
使用

    npm install
    npm run dev
    
打包生成

    npm run build

## 代码结构

    src中存放源代码
    |
    |———— common 存放共用文件：字体文件，js文件，scss文件
    |
    |———— components 存放所有组件
    |
    |———— router 路由配置
    |
    |———— App.vue和main.js ：入口文件
    
## 学习与收获

### Vue 部分
将app的组件一个一个的写完，对Vue的基本用法，就开始渐渐熟悉和了解。这里总结一下自己遇到的麻烦以及踩的坑。
> 其实所谓踩坑，还是官方文档看地不明白，基本上这些坑都在文档上有说明。

- `computed` 和 `method` 方法的区别： 

    前者使用时不加括号，不能传参，必须有 `return` 返回值。计算完后，如果依赖的变量没有改变或者没有依赖的变量，则不会再次计算，之后就会使用缓存。
    
    后者使用时要加括号，可以传参。没有缓存，每次渲染都会重新计算。

- `ref`

	`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例。

	- 取不到 `this.$refs.element`
		
		- 模板还没挂载 ，可以在`mounted`生命周期钩子里面取
		- 或者在`this.$nextTick()`里面的回调函数中取

	可有的时候还是取不到，比如模板里面有外面异步ajax传入的参数来渲染的dom，还是取不到。

	笨办法： 先找到是什么干扰到了ref指向的dom渲染，就用setTimeout来延时，直到取到ref。

- `Vue.set`

    在响应式的数据上添加新的属性，比如 data 中有一个obj ,想要在这个obj上添加属性，obj.a = 1。 如果直接这么写的话，该属性是不被响应的。得用 Vue.set(obj, a, 1),确保属性被创建后也是响应式的，同时触发视图更新。
    
    > 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象
  	
- 集中式的事件中间件
    
    对于非父子节点之间的通讯，官方提出一种简单的方法，那就是定义一个空的vue实例，统一管理事件。那么无论组件在哪一层，都可以`import`访问这个js文件，来实现自由的通信交流。

### 动画部分（小球飞入购物车）

> 动画的总体代码框架参考月影老师写的博客[《用65行代码实现JavaScript动画序列播放》](https://www.h5jun.com/post/sixty-lines-of-code-animation.html)，其异步的特性用起来简直不要太棒。

小球飞入购物车分为两个部分，一个是上升，一个是下降。自己设定好动画的总时长和上升的距离，就可以计算出其他的需要属性。

    let disX = ballNode.getBoundingClientRect().left - cartNode.getBoundingClientRect().left,   // 购物车和起始点的横向距离
        disY = cartNode.getBoundingClientRect().top - ballNode.getBoundingClientRect().top,     // 购物车和起始点的纵向距离
        upY = 50, // 设定上升的纵向距离为50px
        downY = disY + upY, // 下降的纵向距离
        allT = 1000,    // 设定动画总时长为1s。
        upT = allT - allT / (Math.sqrt(upY / downY) + 1),   // 上升的时间
        upX = disX / allT * upT,    // 上升的横向距离
        downT = allT - upT,     // 下降的时间
        downX = disX - upX;     // 下降的横向距离
        
其实里面稍微难理解的就是`upT`的计算，通过解下面方程即可：

    upY / downY = (1/2)*a*(upT^2) / (1/2)*a*(downT^2)
    upT + downT = allT
    
动画部分的代码

    // 动画部分
    let ballUp = new Animate(upT, (p) => {
        let bY = upY * p * (2 - p),
            bX = upX * p;
        ballNode.style.transform = `translate(-${bX}px, -${bY}px)`;
    });
    let ballDown = new Animate(downT, (p) => {
        let bY = downY * p * p,
            bX = downX * p;
        ballNode.style.transform = `translate(-${upX + bX}px, ${bY - upY}px)`;
    });

    async function run () {
        await ballUp.animate();
        await ballDown.animate();
        self.$refs.wrap.removeChild(ballNode);
    }
    run();

### 其他

1. 可以通过媒体查询来处理不同dip设备的显示问题，针对pc端为1px宽度在dip为2或3时，可以采用`transform：scale()`的方式解决；
2. 删除远程git分支： 
    
        git push origin :branchName
    如果失败，那么在设置中检查该分支是否为默认分支，如果是则改为master为默认分支，再删除即可。

> 如果你看到我的学习总结有所收获，请star，有问题请issue，谢谢！
