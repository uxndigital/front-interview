/**
 * 方法四：toString 技巧（仅适用于纯数字数组）
 * 利用 toString() 自动展平数组的特性
 *
 * 注意：此方法有严重局限性
 * 1. 只能处理数字类型的数组
 * 2. 会将数字转换为字符串再转回来
 * 3. 不推荐在生产环境使用，仅作为趣味解法了解
 */

function flatten(arr) {
  // toString() 会将嵌套数组展平为逗号分隔的字符串
  // 例如：[1, [2, 3]] => "1,2,3"
  return arr
    .toString()
    .split(',')
    .map(Number);
}

// 使用 JSON 的方式（同样有局限性）
function flattenJSON(arr) {
  return JSON.stringify(arr)
    .replace(/\[|\]/g, '') // 移除所有方括号
    .split(',')
    .map(Number);
}

// 测试
const testArray = [1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]];
console.log('Input:', JSON.stringify(testArray));
console.log('Output (toString):', flatten(testArray));
console.log('Output (JSON):', flattenJSON(testArray));
console.log('Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]');

// 展示局限性
console.log('\n--- 局限性演示 ---');
const mixedArray = [1, 'hello', [2, 'world'], [3]];
console.log('Mixed types input:', JSON.stringify(mixedArray));
console.log('toString result:', flatten(mixedArray)); // 会出错
console.log('❌ 字符串会变成 NaN');

const withNull = [1, [2, null, 3], [4]];
console.log('\nWith null input:', JSON.stringify(withNull));
console.log('toString result:', flatten(withNull)); // null 变成 0
console.log('❌ null 会变成 0');

module.exports = flatten;
