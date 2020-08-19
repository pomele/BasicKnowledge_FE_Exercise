// 自顶向下堆化，从k开始堆化
function fixDown(a,k,n){
    let N = n-1
    while (2 * k <= N) {
        let j = 2 * k
        // 选出左右孩子节点中更大的那个
        if (j < N && a[j] < a[j + 1]) {
            j += 1
        }

        if (a[k] < a[j]) {
            let temp = a[k]
            a[k] = a[j]
            a[j] = temp
            k = j
        } else {
            break
        }
    }
}


function heapSort(l) {
    let n = l.length -  1
    for (let i = Math.floor(n/2); i >= 0; i --) {
        fixDown(l, i, l.length)
    }
    while (n > 1) {
        let temp = l[1]
        l[1] = l[n]
        l[n] = temp
        fixDown(l, 1, n)
        n -= 1
    }
    return l.slice(1)
}

let l = [-1,26,5,77,1,61,11,59,15,48,19] // 第一个元素不用，占位
let res = heapSort(l)
console.log(res)
