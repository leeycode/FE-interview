console.log('深拷贝');

const obj1 = {
    name:'li',
    age:32,
    address:{
        city:'beijing',
        street:'dongcheng'
    }
}

// const obj2 = obj1
const obj2 = deepClone(obj1)

 obj1.address.city = 'shanghai'
 console.log(obj1.address.city);
 console.log(obj2.address.city);

 /**
  * 
  * @param {需要拷贝的值} obj 
  */
 function deepClone(obj={}) {
    // 判断如果是null，或者不是对象或者数组
    if(obj == null || typeof obj !== 'object'){
        return obj
    }
    // 初始化返回结果
    let result
    if(obj instanceof Array){
        result = []
    }else{
        result = {}
    }
    // 遍历对象
    for(let key in obj){
        // 判断是否是自身属性,保证key不是原型的属性
        if(obj.hasOwnProperty(key)){
            // 递归拷贝
            result[key] = deepClone(obj[key])
        }
    }
    return result

}