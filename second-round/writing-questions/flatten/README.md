# 数组扁平化 (Array Flatten)

## 题目

实现一个函数 `flatten`,把嵌套的数组拍平成一维数组。

**示例:**
```javascript
flatten([1, [2, [3, [4]]], 5])
// 输出: [1, 2, 3, 4, 5]
```

## 要求

1. 不修改传入的数组
2. 不使用 `Array.prototype.flat` 等原生方法
3. 请先说明思路,再开始编写代码

## 测试用例

```javascript
flatten([1, [2, [3, [4]]], 5])  // [1, 2, 3, 4, 5]
flatten([])                      // []
flatten([1, { a: [2] }, [3]])   // [1, { a: [2] }, 3]
```

## 运行测试

```bash
npx tsx index.ts
```

在 `index.ts` 文件中完成 `flatten` 函数的实现。
