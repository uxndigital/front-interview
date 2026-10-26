/**
 * 方法三：reduce 简洁实现
 * 使用函数式编程风格，代码更简洁优雅
 */

function flatten(arr) {
  return arr.reduce((acc, item) => {
    // 如果是数组，递归展平后合并；否则直接添加
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// 更简洁的箭头函数写法
const flattenArrow = (arr) =>
  arr.reduce((acc, item) =>
    acc.concat(Array.isArray(item) ? flattenArrow(item) : item)
  , []);

// 使用 flat() 和三元运算符的极简写法
const flattenOneLiner = (arr) =>
  arr.reduce((acc, item) => acc.concat(Array.isArray(item) ? flattenOneLiner(item) : item), []);

// 测试
const testArray = [1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]];
console.log('Input:', JSON.stringify(testArray));
console.log('Output (reduce):', flatten(testArray));
console.log('Output (arrow):', flattenArrow(testArray));
console.log('Output (one-liner):', flattenOneLiner(testArray));
console.log('Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]');

module.exports = flatten;
