// 参考：https://juejin.im/post/5adc8e396fb9a07aa0479725
var arr = [1,[32, [3,[41,5,6], 9, 130], 11], 12,13]

// 使用toString变为，分隔的字符串，再分别返回数字类型
function flatten_tostring(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
}
console.log('toString:')
console.log(arr.toString())
console.log(flatten_tostring(arr))
console.log(arr)




// reduce+递归
function flatten_reduce(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten_reduce(item) : item);
    }, []);
}
console.log('reduce:')
console.log(arr)
console.log(flatten_reduce(arr))




// join 是针对数组，功能是连接数组元素为一个字符串，可以指定连接字符。
// toString 针对的对象就比较广了，基本上只要是 javascript 的内建对象，都可以用 toString。具体得到什么内容，要看对象是什么。
function flatten_join(arr) {
    return arr.join(',').split(',').map(function(item) {
        return parseInt(item);
    })
}
console.log('join:')
console.log(arr)
console.log(arr.join(','))
console.log(flatten_join(arr))




//递归
function flatten_digui(arr) {
    var res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(flatten_digui(item));
        } else {
            res.push(item);
        }
    });
    return res;
}
console.log('digui:')
console.log(arr)
console.log(flatten_digui(arr))




// 扩展运算符:难懂，不建议
function flatten_kuozhan(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log('kuozhan:')
console.log(arr)
console.log(flatten_kuozhan(arr))




