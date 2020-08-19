console.log([] + [])
// ''
// 这行代码输出的是空字符串""， 包装类型在运算的时候，会先调用valueOf方法，如果valueOf返回的还是包装类型，那么再调用toString方法
// 数组 toString 默认会将数组各项使用逗号 "," 隔开, 比如 [1,2,3].toSting 变成了"1,2,3",空数组 toString 就是空字符串
// 所以上面的代码相当于 console.log("" + "")

console.log({} + [])
// [object Object]
// 对象 {}隐式转换成了[object Object],然后与""相加

console.log([] == ![])
// true
// ![]为0，也就是[] == 0，==成立，===不成立
// 这个输出 false
// 详细步骤：
//     console.log(![])
//     // 套用上面第三条 将 false 转换为 数值
//     // 这个输出 0
//     console.log(Number(false))
//     // 包装类型与 基本类型 == 先将包装类型通过 valueOf toString 转换为基本类型
//     // 输出 ""
//     console.log([].toString())
//     // 套用第2条， 将空字符串转换为数值、
//     // 输出 0
//     console.log(Number(""))
//     // 所以
//     console.log(0 == 0)

console.log(true + false)
// 1
// 两个基本类型相加，如果其中一方是字符，则将其他的转换为字符相加，否则将类型转换为Number,然后相加, Number(true) 是1, Number(false)是0, 所以结果是 1

console.log(![])
// !将操作的值强制转换为布尔值并取反
// Boolean([]) 为true
