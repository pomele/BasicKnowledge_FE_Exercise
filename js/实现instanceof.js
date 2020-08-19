/**
 自定义instanceof
 */
function instanceOf(left, right) {
    let proto = left.__proto__
    // 循环查找直到为空
    while(proto){
        if(proto === right.prototype){
            return true
        }
        proto = proto.__proto__
    }
    return false
}

class A{}
class B extends A {}
class C{}

const b = new B()
// 输出 true
console.log(instanceOf(b,B))
// 输出 true
console.log(instanceOf(b,A))
// 输出 false
console.log(instanceOf(b,C))
