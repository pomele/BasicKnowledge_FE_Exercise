// 核心功能：
// 1. new Promise(fn) 其中 fn 只能为函数，且要立即执行
// 2. promise.then(success)中的 success 会在 resolve 被调用的时候执行
//
// 实现思路：
// 1. then(succeed, fail) 先把成功失败回调放到对象实例 callbacks[] 上
// 2. resolve() 和 reject() 遍历callbacks
// 3. resolve() 读取成功回调 / reject() 读取失败回调（异步等待 then 把回调放好）
// 4. 执行回调
// 参考：https://juejin.im/post/6844903648145702926#heading-0



// 这里我们创建了一个构造函数 参数就是执行器
function Promise(exector) {
    // 这里我们将value 成功时候的值 reason失败时候的值放入属性中
    let self = this;
    // 这里我们加入一个状态标识
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 存储then中成功的回调函数
    this.onResolvedCallbacks = [];
    // 存储then中失败的回调函数
    this.onRejectedCallbacks = [];

    // 成功执行
    function resolve(value) {
        // 判断是否处于pending状态
        if (self.status === 'pending') {
            self.value = value;
            // 这里我们执行之后需要更改状态
            self.status = 'resolved';
            // 成功之后遍历then中成功的所有回调函数
            self.onResolvedCallbacks.forEach(fn => fn());
        }
    }

    // 失败执行
    function reject(reason) {
        // 判断是否处于pending状态
        if (self.status === 'pending') {
            self.reason = reason;
            // 这里我们执行之后需要更改状态
            self.status = 'rejected';
            // 成功之后遍历then中失败的所有回调函数
            self.onRejectedCallbacks.forEach(fn => fn());
        }
    }

    // 这里对异常进行处理
    try {
        exector(resolve, reject);
    } catch(e) {
        reject(e)
    }
}

// 简易版then，只能实现一次调用，不能链式调用
Promise.prototype.then = function(onFulfilled, onRejected) {
    // 获取下this
    let self = this;
    if (this.status === 'resolved') {
        onFulfulled(self.value);
    }

    if (this.status === 'rejected') {
        onRejected(self.reason);
    }

    // 如果异步执行则位pending状态
    if(this.status === 'pending') {
        // 保存回调函数
        this.onResolvedCallbacks.push(() => {
            onFulfilled(self.value);
        })

        this.onRejectedCallbacks.push(() => {
            onRejected(self.reason)
        });
    }
}

/**
 * 可链式调用
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
    onRejected = typeof onRejected === 'function'?onRejected: err=>{throw err}
    let self = this;
    let promise2;
    promise2 = new Promise((resolve, reject) => {
        if (self.status === 'resolved') {
            setTimeout(()=>{
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'rejected') {
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
            self.onRejectedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
        }
    });
    return promise2
}


// 之前返回的promise或者成功/失败的值
function resolvePromise(promise2,x,resolve,reject){
    // promise2和函数执行后返回的结果是同一个对象

    if(promise2 === x){
        return reject(new TypeError('Chaining cycle'));
    }
    let called;
    // x可能是一个promise 或者是一个普通值
    if(x!==null && (typeof x=== 'object' || typeof x === 'function')){
        try{
            let then = x.then; // 取对象上的属性 怎么能报异常呢？(这个promise不一定是自己写的 可能是别人写的 有的人会乱写)
            // x可能还是一个promise 那么就让这个promise执行即可
            // {then:{}}
            // 这里的逻辑不单单是自己的 还有别人的 别人的promise 可能既会调用成功 也会调用失败
            if(typeof then === 'function'){
                then.call(x,y=>{ // 返回promise后的成功结果
                    // 递归直到解析成普通值为止
                    if(called) return; // 防止多次调用
                    called = true;
                    // 递归 可能成功后的结果是一个promise 那就要循环的去解析
                    resolvePromise(promise2,y,resolve,reject);
                },err=>{ // promise的失败结果
                    if(called) return;
                    called = true;
                    reject(err);
                });
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{ // 如果x是一个常量
        resolve(x);
    }
}






// 调用promise
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    })
})


p.then().then(data => {
    console.log(data);
    throw new Error('e');
}).then().then(null, err => {
    console.log(err);
})

