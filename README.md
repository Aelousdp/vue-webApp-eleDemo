# vue-webApp-eleDemo

学习Vue，仿写饿了么app的demo

未完，每天更新中...

### 学习与总结

#### Vue 部分
将app的组件一个一个的写完，对Vue的基本用法，就开始渐渐熟悉和了解。这里总结一下自己遇到的麻烦以及踩的坑。
> 其实所谓踩坑，还是官方文档看地不明白，基本上这些坑都在文档上有说明。

- `ref`

	`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例。

	- 取不到 `this.$refs.element`
		
		- 模板还没挂载 ，可以在`mounted`生命周期钩子里面取
		- 或者在`this.$nextTick()`里面的回调函数中取

	可有的时候还是取不到，比如模板里面有外面异步ajax传入的参数来渲染的dom，还是取不到。

	笨办法： 先找到是什么干扰到了ref指向的dom渲染，就用setTimeout来延时，直到取到ref。

- 集中式的事件中间件
    
    对于非父子节点之间的通讯，官方提出一种简单的方法，那就是定义一个空的vue实例，统一管理事件。那么无论组件在哪一层，都可以`import`访问这个js文件，来实现自由的通信交流。

#### 动画部分

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

