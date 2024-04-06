
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


// class实际上是function 可见是语法糖
console.log(typeof Student);
console.log(typeof People);

// 隐式原型和显式原型
console.log(xialuo.__proto__);
console.log(Student.prototype);
console.log(xialuo.__proto__ === Student.prototype);

// 原型链
console.log(Student.prototype.__proto__);
console.log(People.prototype);
console.log(Student.prototype.__proto__ === People.prototype);

console.log(xialuo.hasOwnProperty('sayHi')); //false
console.log(xialuo.hasOwnProperty('hasOwnProperty') ); //false

