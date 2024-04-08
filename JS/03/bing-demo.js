// function fn1(a,b,c) {
//   console.log("this", this);
//   console.log(a, b, c);
//   return 'this is fn1'
// }

// const fn2 = fn1.bind({x:100}, 10,20,30); 
// // 1. bind的函数，会返回一个新的函数，这个函数的this绑定了第一个参数，并且参数列表中第一个参数是bind函数的参数列表

// const res = fn2();
// console.log(res);



// 手写bind函数
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

function fn1(a,b,c) {
  console.log("this", this);
  console.log(a, b, c);
  return 'this is fn1'
}

const fn2 = fn1.myBind({x:100}, 10,20,30); 
// 1. bind的函数，会返回一个新的函数，这个函数的this绑定了第一个参数，并且参数列表中第一个参数是bind函数的参数列表

const res = fn2();
console.log(res);