
// call
Function.prototype.Call = function (context) {
    if (typeof context === 'undefined' || context === null) {
        context = window
    }
    context.fn = this
    // 从第二个参数开始截取数据作为参数
    let args = [...arguments].slice(1),
        res = context.fn(...args)
    delete context.fn
    return res
}

// apply
Function.prototype.Apply = function(context, argArr) {
    if (!(argArr instanceof Array)) {
        throw new Error('请传入一个数组')
    } else if (typeof context === 'undefined' ||  context === null) {
        context = window
    }
    context.fn = this
    let args = [...arguments].slice(1),
        res = context.fn(...args)
    delete context.fn
    return res
}

