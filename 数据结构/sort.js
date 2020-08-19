// 参考：https://www.jianshu.com/p/2b2f1f79984e
// 取第一个数作为基准pivot，先从右往左找，找到第一个小于pivot的数,赋值给arr[left]，再从左往右找，找到第一个大于pivot的数，赋值给arr[right]
// 依次查找，知道left==right，完成一轮循环，此时pivot本身已排序，这时再分别对pivot左边和右边的数采用同样的方法进行排序
function quick_sort(arr) {
    return q_sort(arr, 0, arr.length-1)
}
function q_sort(arr, left, right) {
    if (left < right) {
        let pivot = partition(arr, left, right)
        q_sort(arr, left, pivot - 1)
        q_sort(arr, pivot + 1, right)
    }
    return arr
}
function partition(arr, left, right) {
    let pivotKey = arr[left]
    // 精髓
    while (left < right) {
        while (left < right && arr[right] >= pivotKey) {
            right -= 1
        }
        // arr[left]赋值给了pivotKey
        arr[left] = arr[right]
        while(left < right && arr[left] <= pivotKey) {
            left += 1
        }
        arr[right]  = arr[left]
    }
    arr[left] = pivotKey
    return left
}
arr = [5, 9, 1, 11, 6, 7, 2, 4]
console.log(quick_sort(arr))


// 冒泡排序：每次两两交换，依次往后，两个for循环
// 选择排序：每次从剩下的数组元素里选择最小（或者最大）的元素放在当前位置
// 插入排序：对于每个元素，遍历它之前已经排好序的数组，把该元素插入之前排好序的位置
// 归并排序：递归的将数组两两分开直到只包含一个元素，然后 将数组排序合并，最终合并为排序好的数组    稳定
