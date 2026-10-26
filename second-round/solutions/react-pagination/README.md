# React 分页面试题 - 参考答案

本目录包含多种实现方式，展示不同层次的解决方案。

## 文件说明

### `App-basic.tsx` - 基础实现 ⭐⭐⭐

**适用场景：** 满足基本要求，代码清晰

**实现要点：**

1. ✅ 使用单个 state 管理所有状态
2. ✅ useEffect 依赖 `[page, pageSize]`
3. ✅ 显示加载状态
4. ✅ 边界判断（禁用按钮）
5. ✅ 正确的状态更新（展开语法）

**评分：** 80/100

### `App-advanced.tsx` + `usePagination.ts` - 进阶实现 ⭐⭐⭐⭐⭐

**适用场景：** 可复用、可维护的生产级代码

**实现要点：**

1. ✅ 自定义 Hook 封装逻辑
2. ✅ 支持跳转到指定页
3. ✅ 支持改变每页条数
4. ✅ 页码列表展示
5. ✅ TypeScript 类型完善
6. ✅ 更好的用户体验

**评分：** 100/100

---

## 实现对比

| 特性 | 基础实现 | 进阶实现 |
|------|---------|---------|
| 显示数据 | ✅ | ✅ |
| 翻页功能 | ✅ | ✅ |
| 加载状态 | ✅ | ✅ |
| 边界判断 | ✅ | ✅ |
| 跳转页码 | ❌ | ✅ |
| 改变每页条数 | ❌ | ✅ |
| 页码列表 | ❌ | ✅ |
| 自定义 Hook | ❌ | ✅ |
| 代码复用性 | 低 | 高 |

---

## 核心知识点讲解

### 1. State 管理的最佳实践

#### ❌ 常见错误

```typescript
// 错误 1：分散的状态管理
const [data, setData] = useState([]);
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState(10);
const [loading, setLoading] = useState(false);
// 问题：多个 setState 调用，难以同步

// 错误 2：setState 覆盖其他字段
setState({ data: newData }); // page 和 pageSize 丢失
```

#### ✅ 正确做法

```typescript
// 方案 1：单个对象 state（推荐小型场景）
const [state, setState] = useState({
  data: [],
  page: 0,
  pageSize: 10,
  loading: false,
});

// 更新时保留其他字段
setState(prev => ({ ...prev, loading: true }));

// 方案 2：自定义 Hook（推荐复杂场景）
const { data, page, loading, nextPage } = usePagination();
```

### 2. useEffect 依赖数组

#### ❌ 常见错误

```typescript
// 错误 1：缺少依赖项
useEffect(() => {
  fetchData(page, pageSize); // page 和 pageSize 未列入依赖
}, []); // 只执行一次，page 变化不会触发

// 错误 2：依赖项过多
useEffect(() => {
  fetchData();
}, [page, pageSize, data, loading]); // data 和 loading 不应作为依赖
```

#### ✅ 正确做法

```typescript
// 只依赖真正影响执行逻辑的变量
useEffect(() => {
  fetchData();
}, [page, pageSize]); // page 或 pageSize 变化时重新获取数据
```

### 3. 异步数据获取模式

#### ❌ 常见错误

```typescript
// 错误 1：没有加载状态
useEffect(() => {
  getData({ page, pageSize }).then(result => {
    setState({ data: result.data }); // 用户看不到加载过程
  });
}, [page]);

// 错误 2：没有错误处理
useEffect(() => {
  getData({ page, pageSize }).then(result => {
    setState({ data: result.data });
  }); // 如果请求失败怎么办？
}, [page]);
```

#### ✅ 正确做法

```typescript
const fetchData = async () => {
  setState(prev => ({ ...prev, loading: true }));
  try {
    const result = await getData({ page, pageSize });
    if (result) {
      setState(prev => ({
        ...prev,
        data: result.data,
        totalSize: result.totalSize,
        pageCount: result.pageCount,
        loading: false,
      }));
    }
  } catch (error) {
    console.error("获取数据失败:", error);
    setState(prev => ({ ...prev, loading: false }));
  }
};

useEffect(() => {
  fetchData();
}, [page, pageSize]);
```

### 4. 事件处理函数

#### ❌ 常见错误

```typescript
// 错误 1：直接修改 state
const handleNext = () => {
  page++; // ❌ 不能直接修改
  setState({ page });
};

// 错误 2：没有边界判断
const handleNext = () => {
  setState(prev => ({ ...prev, page: prev.page + 1 }));
  // 最后一页也能点
};
```

#### ✅ 正确做法

```typescript
const handleNext = () => {
  if (page < pageCount - 1) {
    setState(prev => ({ ...prev, page: prev.page + 1 }));
  }
};

// 或者在 UI 层禁用
<button disabled={page >= pageCount - 1} onClick={handleNext}>
  下一页
</button>
```

---

## 进阶技巧

### 1. 自定义 Hook 的设计原则

```typescript
// ✅ 好的 Hook 设计
function usePagination(options) {
  // 1. 封装完整的逻辑
  // 2. 返回清晰的接口
  // 3. 可配置
  // 4. 可复用

  return {
    // 状态
    data, page, loading,
    // 操作
    nextPage, prevPage, goToPage,
  };
}

// ❌ 不好的设计
function usePagination() {
  // 返回内部状态，暴露实现细节
  return { state, setState, fetchData };
}
```

### 2. 性能优化

```typescript
// 使用 useCallback 缓存函数
const handleNext = useCallback(() => {
  if (page < pageCount - 1) {
    setState(prev => ({ ...prev, page: prev.page + 1 }));
  }
}, [page, pageCount]);

// 使用 useMemo 缓存计算结果
const pageNumbers = useMemo(() => {
  // 计算要显示的页码列表
  return generatePageNumbers(page, pageCount);
}, [page, pageCount]);
```

### 3. TypeScript 类型安全

```typescript
// 定义清晰的类型
interface PageData {
  data: number[];
  totalSize: number;
  pageCount: number;
}

interface UsePaginationReturn {
  data: number[];
  page: number;
  loading: boolean;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

// 使用泛型支持不同数据类型
function usePagination<T>(
  fetcher: (params: FetchParams) => Promise<PageData<T>>
): UsePaginationReturn<T> {
  // ...
}
```

---

## 扩展阅读

### React 官方文档

- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [useState Hook](https://react.dev/reference/react/useState)
- [自定义 Hook](https://react.dev/learn/reusing-logic-with-custom-hooks)

### 常见分页库

- [react-paginate](https://www.npmjs.com/package/react-paginate)
- [rc-pagination](https://www.npmjs.com/package/rc-pagination)
- [Ant Design Pagination](https://ant.design/components/pagination)

### 相关技术

- [SWR](https://swr.vercel.app/) - 数据获取 Hook
- [React Query](https://tanstack.com/query) - 强大的数据同步库
- [useHooks](https://usehooks.com/) - 自定义 Hook 集合
