let obj = {
    name: 'zym',
    age: 23,
    job: 'engineer',
    // 1.普通的添加iterator
    [Symbol.iterator]() {
        const self = this
        const keys = Object.keys(self)
        let index = 0
        return {
            next() {
                if (index < keys.length) {
                    return {
                        value: self[keys[index++]],
                        done: false
                    }
                } else {
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
    // 2.使用Generator函数
    // * [Symbol.iterator] () {
    //     const self = this
    //     const keys = Object.keys(self)
    //     for (let i = 0; i < keys.length; i++) {
    //         yield self[keys[i]]
    //     }
    // }
}
// 例子
for(let item of obj) {
    console.log(item);
}
