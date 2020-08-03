// 使用reduce
function execute_reduce(tasks) {
    return tasks.reduce(
        (previousPromise, currentPromise) => previousPromise.then((resultList) => {
            // 每次调用返回一个promise，在promise的then中执行下一次调用
            return new Promise(resolve => {
                currentPromise().then(result => {
                    resolve(resultList.concat(result))
                }).catch(() => {
                    resolve(resultList.concat(null))
                })
            })
        }),
        Promise.resolve([])
    )
}


// 使用循环遍历
// 思路：
// 全局定义一个promise实例sequence，循环遍历函数数组，每次循环更新sequence，将要执行的函数item通过sequence的then方法进行串联，
// 并且将执行结果推入data数组，最后将更新的data返回，这样保证后面sequence调用then方法，如何后面的函数需要使用data只需要将函数改为带参数的函数。
function execute(tasks) {
    // 保存数组中的函数执行后的结果
    var data = [];

    // Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。
    var sequence = Promise.resolve();

    tasks.forEach(function (item) {
        // 第一次的 then 方法用来执行数组中的每个函数，
        // 第二次的 then 方法接受数组中的函数执行后返回的结果，
        // 并把结果添加到 data 中，然后把 data 返回。
        sequence = sequence.then(item).then(function (res) {
            data.push(res);
            return data;
        }, () => {
            // catch用于处理出错的情况，否则会执行失败
            data.push(null)
            return data
        })
    })

    // 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，
    // 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。
    return sequence;
}



const Task = (result, isSuccess = true) => {
    return () => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                console.log(`success: ${result}`);
                resolve(result);
            } else {
                console.log(`error: ${result}`);
                reject(result);
            }
        }, 1000);
    });
}


execute([
    Task('A'),
    Task('B'),
    Task('X', false),
    Task('C'),
]).then(resultList => {
    // 这里期望打印 ["A", "B", null, "C"]
    console.log(resultList)
})
