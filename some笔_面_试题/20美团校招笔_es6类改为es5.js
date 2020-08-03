class Person {
    constructor (name) {
        this.name = name;
    }
    greet () {
        console.log(`Hi, my name is ${this.name}`);
    }
    greetDelay (time) {
        setTimeout(() => {
            console.log(`Hi, my name is ${this.name}`);
        }, time);
    }
}

// 改为es5
var Person = (function () {
    function Person (name) {
        this._name = name;
    }
    Person.prototype.greet = function () {
        console.log('Hi, my name is ' + this._name);
    }
    // 注意这里的this指向要更改，setTimeout默认指向window
    Person.prototype.greetDelay = function (time) {
        var _this = this;
        setTimeout(function () {
            console.log('Hi, my name is ' + _this.name);
        }, time);
    }
})();

// setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致这些代码中包含的 this 关键字会指向 window (或全局)对象
// 解决方法：
// 1.使用局部变量：
// var _this=this;
// setTimeout(function() {
//     console.log("Hi, my name is "+_this.name);
// }, time);
// 2.使用箭头函数
// setTimeout(() => {
//     console.log("Hi, my name is "+_this.name);
// }, time);
// 3.bind函数
// bind()方法是在Function.prototype上的一个方法，当被绑定函数执行时，bind方***创建一个新函数，并将第一个参数作为新函数运行时的this
