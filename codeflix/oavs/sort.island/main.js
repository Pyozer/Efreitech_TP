const mSort = require('./m_sort');

const arr = [1337, 42, 86, 7, 3, 9, 1859, 22, 10, 1921];

console.log(mSort.bubble(arr));
console.log(mSort.selection(arr));
console.log(mSort.insertion(arr));
console.log(mSort.merge(arr));
console.log(mSort.quick(arr));