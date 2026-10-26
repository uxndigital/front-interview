/**
 * 统一测试所有 flatten 实现
 */

const flattenRecursive = require('./flatten-recursive.js');
const flattenIterative = require('./flatten-iterative.js');
const flattenReduce = require('./flatten-reduce.js');
const flattenToString = require('./flatten-tostring.js');

// 测试用例
const testCases = [
  {
    name: '基本嵌套',
    input: [1, [2, 3, [4]], 5, [6], [[7]], [8, [9]]],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    name: '深层嵌套',
    input: [[[[[1]]]], [2, [3, [4, [5]]]]],
    expected: [1, 2, 3, 4, 5]
  },
  {
    name: '空数组',
    input: [],
    expected: []
  },
  {
    name: '无嵌套',
    input: [1, 2, 3, 4],
    expected: [1, 2, 3, 4]
  },
  {
    name: '包含空数组',
    input: [1, [], [2, []], 3],
    expected: [1, 2, 3]
  },
  {
    name: '单元素嵌套',
    input: [[[[1]]]],
    expected: [1]
  }
];

// 实现列表
const implementations = [
  { name: '递归实现', fn: flattenRecursive, skipMixed: false },
  { name: '迭代实现', fn: flattenIterative, skipMixed: false },
  { name: 'reduce实现', fn: flattenReduce, skipMixed: false },
  { name: 'toString实现', fn: flattenToString, skipMixed: true } // 仅适用于数字数组
];

// 辅助函数：比较数组是否相等
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// 运行测试
console.log('========== Flatten 实现测试 ==========\n');

implementations.forEach(({ name, fn, skipMixed }) => {
  console.log(`\n【${name}】`);
  console.log('─'.repeat(50));

  let passed = 0;
  let failed = 0;

  testCases.forEach(testCase => {
    try {
      // 深拷贝输入数组，避免被修改
      const input = JSON.parse(JSON.stringify(testCase.input));
      const result = fn(input);
      const isPass = arraysEqual(result, testCase.expected);

      if (isPass) {
        console.log(`✅ ${testCase.name}`);
        passed++;
      } else {
        console.log(`❌ ${testCase.name}`);
        console.log(`   输入: ${JSON.stringify(testCase.input)}`);
        console.log(`   期望: ${JSON.stringify(testCase.expected)}`);
        console.log(`   实际: ${JSON.stringify(result)}`);
        failed++;
      }
    } catch (error) {
      console.log(`💥 ${testCase.name} - 运行错误: ${error.message}`);
      failed++;
    }
  });

  console.log(`\n统计: ${passed} 通过 / ${failed} 失败 / ${passed + failed} 总计`);
});

// 性能测试
console.log('\n\n========== 性能测试 ==========\n');

const largeArray = Array(1000).fill(0).map((_, i) =>
  i % 3 === 0 ? [i, [i + 1]] : i
);

implementations.forEach(({ name, fn }) => {
  const start = performance.now();

  for (let i = 0; i < 100; i++) {
    fn([...largeArray]);
  }

  const duration = (performance.now() - start).toFixed(2);
  console.log(`${name}: ${duration}ms (100次运行)`);
});

console.log('\n========== 测试完成 ==========\n');
