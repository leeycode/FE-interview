## 原型和原型链

### 类

```
class Student {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
    sayHi(){
        console.log(`姓名：${this.name}, 学号：${this.number}`);
    }
}
```

#### 通过类 new 对象/实例

```

const xialuo = new Student("夏洛",100)

console.log(xialuo.name);
console.log(xialuo.number);
xialuo.sayHi()
```

#### 继承

```

// 父类
class People {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat something`);
    }
}

// 子类
class Student extends People {
    constructor(name,number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log(`姓名：${this.name},学号：${this.number}`);
    }
}

// 子类
class Teacher extends People {
    constructor(name, major) {
        super(name)
        this.major = major
    }
    teach() {
        console.log(`${this.name} 教授 ${this.number}`);
    }
}


// 学生实例
const xialuo = new Student("夏洛",100)
console.log(xialuo.name);
console.log(xialuo.number);
xialuo.sayHi()
xialuo.eat()

// 老师实例
const wanglaoshi = new Teacher('王老师',"语文")

console.log(wanglaoshi.name);
console.log(wanglaoshi.major);
wanglaoshi.eat()
wanglaoshi.teach()
```


### 原型
```
// class 实际上是函数，可见是语法糖

typeof Student // function
typeof People  // function


// 隐式原型和显式原型

console.log(xialuo.__proto__);
console.log(Student.prototype);
console.log(xialuo.__proto__ === Student.prototype); // true
```

#### 原型关系
1. 每个class(函数)都有一个显示原型 prototype 属性，这个属性是一个指针，指向一个对象，这个对象的用途是让所有该函数的实例共享。
2. 每个实例对象，都有一个隐式原型 __proto__属性，这个属性是一个指针。
3. 实例的__proto__属性指向对应的class的prototype属性。

#### 基于原型的执行规则
1. 获取属性xiaoluo.name或执行xialuo.sayHi()时
2. 会先在自身xiaoluo中查找属性和方法
3. 没有找到，再找xiaoluo的隐式原型__proto__，找到了，就返回。


### 原型链
```
console.log(Student.prototype.__proto__);
console.log(People.prototype);
console.log(Student.prototype.__proto__ === People.prototype);
```

![原型链](https://s3.bmp.ovh/imgs/2024/04/06/d3482902b88c9cab.png)


再往上找就到Object,Object往上就没了

```
console.log(xialuo.hasOwnProperty('sayHi')); //false
console.log(xialuo.hasOwnProperty('hasOwnProperty') ); //false
```
![](https://s3.bmp.ovh/imgs/2024/04/06/d3482902b88c9cab.png)




### 问题和解答

1. 如何判断一个变量是不是数组

```
a instanceof Array
```

2. class 的原型本质
```
原型和原型链的图示

属性和方法执行的规则
```

3. 手写简易jQuery考虑插件和扩展性

```
class jQuery {
    constructor(selector) {
        const result = document.querySelectorAll(selector);
        const length = result.length;
        for (let i = 0; i < length; i++) {
            this[i] = result[i];
        }

        this.length = length;
        this.selector = selector
    }
    get(index) {
        return this[index];
    }

    each(fn) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i];
            fn(elem)
        }
    }
    
    on(type,fn) {
        return this.each(elem => {
            elem.addEventListener(type, fn, false);
        });
    }
    // 扩展很多dom操作API
}

// 插件
jQuery.prototype.dialog = function(info) {
    alert(info)
}

// 造轮子
class myjQuery extends jQuery {
    constructor(selector) {
        super(selector);
    }
    // 扩展很多dom操作API
    addclass(className) {
        return this.each(elem => {
            elem.classList.add(className);
        });
    }
}
```
