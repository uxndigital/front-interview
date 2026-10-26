/**
 * 扩展实现：支持指定深度的 flatten
 */

/**
 * 递归实现指定深度展平
 * @param {Array} arr - 要展平的数组
 * @param {number} depth - 展平深度，默认为 Infinity（完全展平）
 */
function flattenDepth(arr, depth = Infinity) {
  if (depth === 0) {
    return arr;
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // 递归展平，深度减 1
      result.push(...flattenDepth(arr[i], depth - 1));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

// reduce 实现
function flattenDepthReduce(arr, depth = Infinity) {
  return depth > 0
    ? arr.reduce((acc, item) =>
        acc.concat(
          Array.isArray(item) ? flattenDepthReduce(item, depth - 1) : item
        ), []
      )
    : arr;
}

// 测试
const testArray = [1, [2, [3, [4, [5]]]]];

console.log('原始数组:', JSON.stringify(testArray));
console.log('\n深度展平测试:');
console.log('depth = 0:', flattenDepth(testArray, 0)); // [1, [2, [3, [4, [5]]]]]
console.log('depth = 1:', flattenDepth(testArray, 1)); // [1, 2, [3, [4, [5]]]]
console.log('depth = 2:', flattenDepth(testArray, 2)); // [1, 2, 3, [4, [5]]]
console.log('depth = 3:', flattenDepth(testArray, 3)); // [1, 2, 3, 4, [5]]
console.log('depth = Infinity:', flattenDepth(testArray)); // [1, 2, 3, 4, 5]

console.log('\nreduce 版本:');
console.log('depth = 2:', flattenDepthReduce(testArray, 2));

// 对比原生 Array.prototype.flat()
console.log('\n对比原生 flat():');
console.log('flat(1):', testArray.flat(1));
console.log('flat(2):', testArray.flat(2));
console.log('flat(Infinity):', testArray.flat(Infinity));

module.exports = { flattenDepth, flattenDepthReduce };
