// var add = function() {
//     var _args = [];
//     return function() {
//         console.log('arguments', arguments)
//         if(arguments.length === 0) {
//             return _args.reduce(function(a, b) {
//                 return a + b;
//             })
//         }
//         [].push.apply(_args, arguments);
//         console.log('_args:', _args)
//         return arguments.callee;
//     }
// }
// var sum = add();
// console.log(sum(100, 200)(300))
// console.log(sum(400))
// console.log(sum()) // 1000


// 通用表达式
var curry = function(fn) {
    var func = function() {
        var _args = [].slice.call(arguments, 0);
        console.log('_args', _args)
        var func1 = function() {
            [].push.apply(_args, arguments)
            return func1;
        }
        func1.toString = func1.valueOf = function() {
            return fn.apply(fn, _args);
        }
        return func1;
    }
    return func;
}
var add = function() {
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    })
}

var adder = curry(add)
console.log(adder(1)(2)(3)(4).valueOf())



