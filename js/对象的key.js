const a = {}
const b = Symbol('1')
const c = Symbol('1')
a[b] = '子君'
a[c] = '君子'

// 输出子君
console.log(a[b])

const d = {}
const e = {key: '1'}
const f = {key: '2'}
d[e] = '子君'
d[f] = '君子'

// 输出君子
console.log(d[e])

// 对于第一个输出，Symbol()函数会返回「symbol」类型的值，而Symbol函数传的参数仅仅是用于标识的，不会影响值的唯一性
// 对于第二个输出， 因为e和f都是对象，而对象的key只能是数值或字符，所以会将对象转换为字符，对象的toString方法返回的是[object Object], 所有输出的是君子


let m = {key: 9}
let n = {key: 9}
let o = m
console.log(m == n)
console.log(m == o)

