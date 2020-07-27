/**
 * Defer a task to execute it asynchronously.
 */
// nextTick想要一个异步API，用来在当前的同步代码执行完毕后，执行我想执行的异步回调，所以不同环境分别使用了Promise、setTimeout和MutationObserver
export const nextTick = (function () {
    // callbacks 用来存储所有需要执行的回调函数
    // pending 用来标志是否正在执行回调函数
    // timerFunc 用来触发执行回调函数
    const callbacks = []
    let pending = false
    let timerFunc

    // 执行callbacks中的回掉函数
    function nextTickHandler () {
        pending = false
        // 拷贝callbacks数组
        const copies = callbacks.slice(0)
        // callbacks长度置为0，此时打印的callbacks为[]
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    // 先判断是否原生支持promise，如果支持，则利用promise来触发执行回调函数；
    // 否则，如果支持MutationObserver，则实例化一个观察者对象，观察文本节点发生变化时，触发执行所有回调函数。
    // 如果都不支持，则利用setTimeout设置延时为0。
    /* istanbul ignore if */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
        var p = Promise.resolve()
        var logError = err => { console.error(err) }
        timerFunc = () => {
            p.then(nextTickHandler).catch(logError)
            // in problematic UIWebViews, Promise.then doesn't completely break, but
            // it can get stuck in a weird state where callbacks are pushed into the
            // microtask queue but the queue isn't being flushed, until the browser
            // needs to do some other work, e.g. handle a timer. Therefore we can
            // "force" the microtask queue to be flushed by adding an empty timer.
            if (isIOS) setTimeout(noop)
        }
    } else if (!isIE && typeof MutationObserver !== 'undefined' && (
        isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS, iOS7, Android 4.4
        var counter = 1
        // MutationObserver是HTML5中的新API，是个用来监视DOM变动的接口。他能监听一个DOM对象上发生的子节点删除、属性修改、文本内容修改等等。
        var observer = new MutationObserver(nextTickHandler)
        var textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {
            characterData: true
        })
        timerFunc = () => {
            counter = (counter + 1) % 2
            textNode.data = String(counter)
        }
    } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        timerFunc = () => {
            setTimeout(nextTickHandler, 0)
        }
    }

    return function queueNextTick (cb?: Function, ctx?: Object) {
        let _resolve
        callbacks.push(() => {
            if (cb) {
                try {
                    cb.call(ctx)
                } catch (e) {
                    handleError(e, ctx, 'nextTick')
                }
            } else if (_resolve) {
                _resolve(ctx)
            }
        })
        if (!pending) {
            pending = true
            // timerFunc中设置了不同的异步方式 Promise、MutationObserver和setTimeout
            timerFunc()
        }
        if (!cb && typeof Promise !== 'undefined') {
            return new Promise((resolve, reject) => {
                _resolve = resolve
            })
        }
    }
})()
