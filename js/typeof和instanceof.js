// 对于 typeof, 可以正确判断除了null之外的所有基本类型，而对于引用类型，除了函数外其他都会被判断为object。

// 对于instanceof,无法判断基本类型，但可以正确判断引用类型

console.log(typeof (() => {}))
// function

console.log(typeof ['前端有的玩','公众号'])
// object


console.log(typeof null)
// object


console.log(typeof undefined)
// undefined

console.log(typeof Function.prototype)
// object

console.log('子君' instanceof String)
// false

console.log(new Date() instanceof Date)
// true
