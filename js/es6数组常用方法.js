// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
// callback函数里面有四个参数
// total:初始值（也叫累计值）
// currentValue: 当前元素值
// currentIndex：当前元素索引值
// arr:当前元素所属数组对象
// initialValue：循环的初始值（第一次循环的初始值）
// 不修改原字符串，函数返回执行结果
// 实现计算字符串中字符出现次数的方法
var str = 'aabbfcfc';
var res = str.split('').reduce((res, cur) => {
    res[cur] ? res[cur]++ : res[cur] = 1;
    return res; // 循环结束之后return
}, {});
console.log(res)  // {a: 2, b: 2, f: 2, c: 2}

// Array.sort(fun) fun是一个函数，可选可不选
// 按照对象属性排序，修改原数组
var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];
var compare = age => {
    return (a,b) => {
        return a[age] - b[age];
    }
}
// compare中传入的是age属性
console.log(arr.sort(compare('age')))


