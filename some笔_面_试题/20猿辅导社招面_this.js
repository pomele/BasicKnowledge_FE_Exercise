var num = 1
var myObject = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            console.log(this.num);
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num)
    }
}
myObject.add();       // 1 3    自执行函数中的this指向了window，所以是1，this.num=3把myObject中的this.num值从2改为了3
console.log(myObject.num);     // 3
console.log(num);      // 4   全局的num为4
myObject.sub()        // 3   this指向为myObject
var sub = myObject.sub;
sub();      // 4         this指向window
// 在浏览器中输出 1 3 3 4 3 4
// 在webstorm中没有window对象，输出undefined 3 3 1 3 4



console.log('')
// this结合箭头函数：
// 第一种情况
var x= 10
var obj ={
    x: 20,
    f1: function(){
        console.log(this.x)
    },
    f2: () => {
        console.log(this.x) // 指向 window
    }
}
obj.f1() // 20
obj.f2() // 10

// 第二种情况
var name = "jack"
var man = {
    name: 'tom',
    f1: function(){
        // 这边的this和下面的setTimeout函数下的this相等
        var that = this
        setTimeout(()=>{
            console.log(this.name, that === this) // 'tom' true
        }, 0)
    },
    f2: function(){
        // 这边的this和下面的setTimeout函数下的this不相等
        var that = this
        setTimeout(function(){
            console.log(this.name,  that === this) // 'jack' false
        }, 0)
    }
}
man.f1()  // 'tom' true
man.f2() // 'jack' false
// 浏览器中是
// 20 10
// tom true
// jack false
