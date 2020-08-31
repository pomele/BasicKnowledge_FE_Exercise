// 一个query(a)函数，防抖和保证请求次序

// 初试方案
// 建立一个队列(Array.push 和Array.shift可实现)；当第一次请求时，将该请求入队列并且立即发送该请求，而后面的请求只push到队列中；当第一次请求响应后，将队头请求发送出去。这样便可以实现上次请求响应成功后才发送下次请求。
// 改进方案
// 但是，代码实现之后发现搜索速度很慢，这是同步模式的不足。观察就会发现，我们并不需要将每个请求都进行发送和响应，只需要对最新的请求进行发送和响应即可。所以在上次响应成功后，判断队列的长度，如果大于1，则保留队尾请求（最新请求）否则清空队列。
handleSearch=(value)=>{
    //定义一个队列
    let {queue}=this.state
    //搜索子不为空的时候，入队列
    if(value!=='') {
        queue.push(value);
    }
    //第一个请求立即发送【这里就是所谓的入口呀】
    if(queue.length===1) {
        this.search()
    }
}

search=()=>{
    let {queue}=this.state
    //队尾请求（最新请求）
    let key=queue[queue.length-1]
    //发送队尾请求
    file.getUser({keywords: key.data}, {headers: {})
        .then(res => {
            //响应请求，这里可以写自己的操作
            if(queue.length>1){
                queue.splice(0,queue.length-1);
                this.search()
            }else{
                queue.splice(0,queue.length);
            }
        }).catch(err => {
        //发生错误中也要对队列进行处理，否则会堵塞入口
        if(queue.length>1){
            queue.splice(0,queue.length-1);
            this.search()
        }else{
            queue.splice(0,queue.length);
        }
    })
}
