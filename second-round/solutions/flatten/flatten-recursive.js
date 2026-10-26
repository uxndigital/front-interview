/**
 * 方法一：递归实现
 * 最直观的实现方式，适合初学者理解
 */

function flatten(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    // 判断当前元素是否为数组
    if (Array.isArray(arr[i])) {
      // 如果是数组，递归调用 flatten，并将结果合并到 result
      result.push(...flatten(arr[i]));
    } else {
      // 如果不是数组，直接添加到结果数组
      result.push(arr[i]);
    }
  }

  return result;
}

// 测试
const testArray = [1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]];
console.log('Input:', JSON.stringify(testArray));
console.log('Output:', flatten(testArray));
console.log('Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]');

module.exports = flatten;
