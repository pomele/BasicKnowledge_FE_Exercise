var name = 'global';
var obj = {
    name: 'local',
    foo: function(){
        this.name = 'foo';
    }.bind(window)
};
var bar = new obj.foo();
setTimeout(function() {
    console.log('window.name', window.name);
}, 0);
console.log('bar.name', bar.name);

var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log('bar3.name', bar3.name);


// bar.name foo
// bar3.name foo2
// window.name global

// // 解析：
// var name = 'global';
// var obj = {
//     name: 'local',
//     foo: function(){
//         console.log(this)
//         this.name = 'foo';
//     }.bind(window)
// };
// console.log(obj.foo());// 此时调用的this是window
// // 由于new绑定的优先级大于bind绑定，所以函数内部this还是obj {}
// var bar = new obj.foo();
// console.log(bar);//{name：'foo'}
// console.log(window.name);//global
//
// // 定时器任务，在最后放入任务队列，window对象没有被改变，所以输出 'global'
// setTimeout(function() {
//     console.log(window.name);
// }, 0);
// // 此时bar.name =foo,因为被赋值了
// console.log(bar.name);
//
// // 此时执行顺序是var bar3,bar2=bar,bar3=bar2, 所以bar3/bar2/bar都是指向同一个对象
// var bar3 = bar2 = bar;
// bar2.name = 'foo2';
// // 所以bar2修改属性，bar3的也改变了，此时输出为'foo2'
// console.log(bar3.name);
