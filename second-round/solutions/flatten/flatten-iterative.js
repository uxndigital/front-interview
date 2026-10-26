/**
 * 方法二：迭代 + 栈实现
 * 使用栈模拟递归过程，避免递归调用栈溢出
 */

function flatten(arr) {
  const result = [];
  const stack = [...arr]; // 将数组元素复制到栈中

  while (stack.length > 0) {
    // 从栈顶取出一个元素
    const item = stack.pop();

    if (Array.isArray(item)) {
      // 如果是数组，将其元素从右向左压入栈（保持原始顺序）
      // 注意：从右向左是因为栈是后进先出（LIFO）
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    } else {
      // 如果不是数组，添加到结果数组的开头
      // 因为我们是从后往前处理的
      result.unshift(item);
    }
  }

  return result;
}

// 优化版本：使用 unshift 会影响性能，改用反向思路
function flattenOptimized(arr) {
  const result = [];
  const stack = [...arr].reverse(); // 先反转

  while (stack.length > 0) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      // 反转后压栈，保持顺序
      stack.push(...item.reverse());
    } else {
      result.push(item); // 直接 push，不用 unshift
    }
  }

  return result;
}

// 测试
const testArray = [1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]];
console.log('Input:', JSON.stringify(testArray));
console.log('Output (basic):', flatten(testArray));
console.log('Output (optimized):', flattenOptimized(testArray));
console.log('Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]');

module.exports = flattenOptimized;
