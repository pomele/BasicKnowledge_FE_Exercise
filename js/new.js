/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(ctor){
    if(typeof ctor !== 'function'){
        throw 'newOperator function the first param must be a function';
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor;
    // 1.创建一个全新的对象
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = Object.create(ctor.prototype);
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Array.from(arguments);
    // 除去ctor构造函数的其余参数
    console.log('arguments', arguments)
    var argsArr = [].slice.call(arguments, 1);
    console.log('argsArr', argsArr)
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
}


// 例子3 多加一个参数
function Student(name, age){
    this.name = name;
    this.age = age;
    // this.doSth();
    // return Error();
}
Student.prototype.doSth = function() {
    console.log(this.name);
};
var student1 = newOperator(Student, '若', 18);
var student2 = newOperator(Student, '川', 18);
// var student1 = new Student('若');
// var student2 = new Student('川');
console.log(student1, student1.doSth()); // {name: '若'} '若'
console.log(student2, student2.doSth()); // {name: '川'} '川'

student1.__proto__ === Student.prototype; // true
student2.__proto__ === Student.prototype; // true
// __proto__ 是浏览器实现的查看原型方案。
// 用ES5 则是：
Object.getPrototypeOf(student1) === Student.prototype; // true
Object.getPrototypeOf(student2) === Student.prototype; // true



/**
 * 没有区分返回值
 */
function myNew(Obj,...args){
    var obj = Object.create(Obj.prototype);//使用指定的原型对象及其属性去创建一个新的对象
    Obj.apply(obj,args); // 绑定 this 到obj, 设置 obj 的属性
    return obj; // 返回实例
}


/**
 * 使用 new Object()
 */
// 需要返回一个对象 借助函数来实现new操作
// 传入需要的参数： 类 + 属性
const person = new Otaku('乔峰',5000);
const person1 = objectFactory(Otaku, '鸠摩智', 5000);

// 开始来实现objectFactory 方法
function objectFactory(obj, name, age) {}
// 这种方法将自身写死了 如此他只能构造以obj为原型，并且只有name 和 age 属性的 obj
// 在js中 函数因为arguments 使得函数参数的写法异常灵活，在函数内部可以通过arguments来获得函数的参数
function objectFactory() {
    console.log(arguements); //{ '0': [Function: Otaku], '1': '鸠摩智', '2': 5000 }
    // 通过arguments类数组打印出的结果，我们可以看到其中包含了构造函数以及我们调用objectfactory时传入的其他参数
    // 接下来就是要想如何得到其中这个构造函数和其他的参数
    // 由于arguments是类数组，没有直接的方法可以供其使用，我们可以有以下两种方法:
    // 1. Array.from(arguments).shift(); //转换成数组 使用数组的方法shift将第一项弹出
    // 2.[].shift().call(arguments); // 通过call() 让arguments能够借用shift方法
    const Constructor = [].shift.call(arguments);
    const args = arguments;
    // 新建一个空对象 纯洁无邪
    let obj = new Object();
    // 接下来的想法 给obj这个新生对象的原型指向它的构造函数的原型
    obj.__proto__ = Conctructor.prototype;
    // 给构造函数传入属性，注意：构造函数的this属性
    // 参数传进Constructor对obj的属性赋值，this要指向obj对象
    // 在Coustructor内部手动指定函数执行时的this 使用call、apply实现
    Constructor.call(obj,...args);
    return obj;
}

