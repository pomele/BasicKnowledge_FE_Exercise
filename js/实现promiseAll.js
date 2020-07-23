// promise.all 的特点
// 1、接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
// 2、如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
// 3、如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
// 4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调all() 的返回值也是新的 Promise 对象

function promiseAll(promises) {
    return new Promise(function(resolve, reject) {
        if (!isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (var i = 0; i < promiseNum; i++) {
            (function(i) {
                // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。如果这个值是一个 promise ，那么将返回这个
                // promise ；如果这个值是thenable（即带有"then" 方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
                // 否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。
                // then方法可以接受两个回调函数作为参数。
                Promise.resolve(promises[i]).then(function(value) {
                    resolvedCounter++
                    resolvedValues[i] = value
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedValues)
                    }
                }, function(reason) {
                    return reject(reason)
                })
            })(i)
        }
    })
}
