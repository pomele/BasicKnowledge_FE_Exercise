// nodejs的event loop过程：
// 执行全局script同步代码块
// 执行microtask微任务，先执行所有的nextTick中的所有微任务，再执行其他类型的微任务（nextTick在promise.then之前执行）
// 执行macrotask宏任务，共6个阶段，从第一个阶段执行相应每个阶段中的所有宏任务，注意，这里是每个阶段的所有宏任务，浏览器中只取宏任务的第一个执行，每一个阶段的宏任务执行后执行对应的微任务队列，也就是步骤2
// 也就是：timers queue --> 步骤2 --> i/o queue --> 步骤2 --> check queue --> 步骤2 --> close callback queue --> 步骤2 --> timers queue
// 宏任务和微任务有哪些？
// 宏任务：setTimeout，setInterval，setImmediate（node独有），requestAnimationFrame（浏览器独有），I/O，UI rendering（浏览器独有）
// 微任务：process.nextTick（node独有），promise.then()，Object.observe，MutationObserver

console.time('start')

setTimeout(function () {
    console.log(2)
    new Promise( (resolve) => {
        console.log('微任务')
        resolve()
    }).then( () => {
        console.log('setTimeOut中的微任务')
    })
}, 10)
//两个setImmediate执行完成后，才会执行对应的promise.then的微任务，和浏览器不同
setImmediate(function () {
    console.log(1)
    new Promise( (resolve) => {
        console.log('微111任务')
        resolve()
    }).then( () => {
        console.log('setImmediate111中的微任务')
    })
})
setImmediate(function () {
    console.log(1)
    new Promise( (resolve) => {
        console.log('微222任务')
        resolve()
    }).then( () => {
        console.log('setImmediate222中的微任务')
    })
})

new Promise(function (resolve) {
    console.log(3)
    resolve()
    console.log(4)
}).then(function () {
    console.log(5)
    console.timeEnd('start')
})
console.log('6')
process.nextTick(function () {
    console.log('7')
})
console.log('8')


// 3 4 6 8 7 5 1 2
// 注意点：
// 1. process.nextTick比promise.then先执行
// 2. promise中同样是同步代码块


