// 在控制台中运行，document.getElementsByTagName('*')拿到该页面中的所有标签
var tags = document.getElementsByTagName('*');
console.log('tags', tags)
var tagsArr = [];
function countTag(){
    for (var i = 0; i < tags.length; i++) {
        tagsArr.push((tags[i].tagName).toLowerCase());
    }
    // console.log(tagsArr);
    //定义一个数组用于存放相同的元素
    var temp = [];
    //定义一个空数组用于存放每一个标签；
    var tag =[];
    for (var i = 0; i < tagsArr.length; i++) {
        for (var j = i+1; j < tagsArr.length+1; j++) {
            if (tagsArr[i] == tagsArr[j]) {
                temp.push(tagsArr[j]);
                tagsArr.splice(j,1);
                j--;
            }
            if (j == tagsArr.length -i) {
                temp.push(tagsArr[i]);
                tagsArr.splice(i,1);
                i--;
                tag.push(temp);
                temp = [];
            }
        }
    }
    return tag;
}
console.log(countTag());


