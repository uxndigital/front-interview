# React 分页面试题

## 题目要求

实现一个分页组件，支持以下功能：

1. 显示第一页的数据
2. 显示所有分页信息（当前页/总页数、每页条数、总条数）
3. 实现翻页功能

## 运行项目

```bash
pnpm install
pnpm dev
```

## API 说明

```typescript
getData({ page, pageSize })
// 返回: { data: number[], totalSize: number, pageCount: number }
// 注意：该 API 有 3 秒延迟
```

## 实现位置

在 `src/App.tsx` 中完成实现。

