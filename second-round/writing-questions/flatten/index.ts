/**
 * 数组扁平化
 *
 * 实现一个 flatten 函数，将多层嵌套的数组展平为一维数组
 *
 * 示例：
 * flatten([1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]])
 * 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */

function flatten(arr: any[]): any[] {
  // TODO: 在这里实现你的代码

}

// 测试用例
const testArray = [1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]];
console.log('Input:', JSON.stringify(testArray));
console.log('Output:', flatten(testArray));
console.log('Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]');

export default flatten;
