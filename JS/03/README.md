## 作用域和闭包

### 作用域和自由变量

#### 作用域
1. 全局作用域
```
window.x = 1
```

2. 函数作用域

函数内部定义的变量，在函数外部不可访问

```
function f() {
    var x = 1
}
console.log(x) // ReferenceError: x is not defined
```
3. 块级作用域

```
if(true) {
    let x = 1
}
console.log(x) // ReferenceError: x is not defined
```

#### 自由变量
1. 一个变量在当前作用域中没有定义，但是被使用了
2. 向上级作用域一层层查找，直到被找到为止
3. 如果全局作用域中也找不到，则报xx is not defined

![](https://s3.bmp.ovh/imgs/2024/04/07/5e7608d3900bb696.png)

```
let a = 0
function fn1() {
    let a1 = 100
    function fn2() {
        let a2 = 200

        function fn3() {
             let a3 = 300
             console.log(a+a1+a2+a3)
             return a+a1+a2+a3
        }
        fn3()
    }
    fn2()
}
fn1()
```

### 闭包
作用域应用的特殊情况，有两种表现形式

1. 函数作为参数被传递
```
function print(fn) {
    let a = 200
    fn()
}
let a = 100
function fn() {
    console.log(a)
}

print(fn) //100

```

2. 函数作为返回值被返回
```
function create() {
    let a = 100
    function g() {
        console.log(a)
    }
    return g
}
let fn = create()
let a = 200
fn()  // 100

```
>>> 自由变量的查找是从函数定义的地方开始，向上级作用域查找，不是在执行的地方开始查找。


### this
>>> this的指向是在函数执行的是确定的，不是函数定义的时候确定的
![](https://s3.bmp.ovh/imgs/2024/04/07/786a656e4dcda02f.png)

![](https://s3.bmp.ovh/imgs/2024/04/07/bf1fa575b470e2a9.png)

1. 作为普通函数
2. 使用call apply bind
3. 作为对象的方法被调用
4. 在class方法中调用

![](https://s3.bmp.ovh/imgs/2024/04/07/11f62d962a6badb6.png)

5. 箭头函数
找上级作用域的this


### 问题
1. 创建10个a标签，点击后弹出对应的索引值
```
let  a 
for(let i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function(e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
```

2. 手写bind函数

理解bind运行的流程
```
function fn1(a,b,c) {
  console.log("this", this);
  console.log(a, b, c);
  return 'this is fn1'
}

const fn2 = fn1.myBind({x:100}, 10,20,30); 
// 1. bind的函数，会返回一个新的函数，这个函数的this绑定了第一个参数，并且参数列表中第一个参数是bind函数的参数列表

const res = fn2();
console.log(res);
```

手写bind函数
```
Function.prototype.myBind = function (context) {
  // 将参数拆解为数组
  const args = Array.prototype.slice.call(arguments);
  
  // 获取this(数组第一项)
  const t = args.shift();
  
  // fn1.bind(...) 中的fn1
  const self = this;

  // 返回一个函数
  return function () {
    return self.apply(t, args)
  }
}
```

执行下：
```
function fn1(a,b,c) {
  console.log("this", this);
  console.log(a, b, c);
  return 'this is fn1'
}

const fn2 = fn1.myBind({x:100}, 10,20,30); 
// 1. bind的函数，会返回一个新的函数，这个函数的this绑定了第一个参数，并且参数列表中第一个参数是bind函数的参数列表

const res = fn2();
console.log(res);
```

3. 闭包的作用
```
// 闭包隐藏数据，只提供API

function creatCache() {
  const data = {}; // 闭包中的数据，被隐藏，不被外界访问
  return {
    get(key) {
      return data[key];
    },
    set(key, value) {
        data[key] = value;
    },
  };
}

const c =  creatCache();
c.set('name', 'zhangsan');
console.log(c.get('name'));

// 不通过sett'和'get',外界没法修改data
```