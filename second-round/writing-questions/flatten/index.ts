/**
 * 数组扁平化
 *
 * 实现一个 flatten 函数,将多层嵌套的数组展平为一维数组
 *
 * 要求:
 * 1. 不修改传入的数组
 * 2. 不使用 Array.prototype.flat 等原生方法
 *
 * 示例:
 * flatten([1, [2, [3, [4]]], 5])
 * 输出: [1, 2, 3, 4, 5]
 */

function flatten(arr: any[]): any[] {
  // TODO: 在这里实现你的代码

}

// 测试用例
console.log('测试 1:', flatten([1, [2, [3, [4]]], 5]));
console.log('期望:', [1, 2, 3, 4, 5]);

console.log('\n测试 2:', flatten([]));
console.log('期望:', []);

console.log('\n测试 3:', flatten([1, { a: [2] }, [3]]));
console.log('期望:', [1, { a: [2] }, 3]);

export default flatten;

