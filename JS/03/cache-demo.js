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