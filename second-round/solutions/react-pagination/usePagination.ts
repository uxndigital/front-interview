import { useEffect, useState } from "react";
import getData, { PageData } from "./data";

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

interface UsePaginationReturn {
  data: number[];
  page: number;
  pageSize: number;
  totalSize: number;
  pageCount: number;
  loading: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  changePageSize: (size: number) => void;
}

/**
 * 分页自定义 Hook
 * 封装分页逻辑，可复用
 */
export function usePagination({
  initialPage = 0,
  initialPageSize = 10,
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [state, setState] = useState({
    data: [] as number[],
    page: initialPage,
    pageSize: initialPageSize,
    totalSize: 0,
    pageCount: 0,
    loading: false,
  });

  const { data, page, pageSize, totalSize, pageCount, loading } = state;

  // 获取数据
  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await getData({ page, pageSize });
      if (result) {
        setState((prev) => ({
          ...prev,
          data: result.data,
          totalSize: result.totalSize,
          pageCount: result.pageCount,
          loading: false,
        }));
      }
    } catch (error) {
      console.error("获取数据失败:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // 当 page 或 pageSize 变化时重新获取
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  // 跳转到指定页
  const goToPage = (targetPage: number) => {
    if (targetPage >= 0 && targetPage < pageCount) {
      setState((prev) => ({ ...prev, page: targetPage }));
    }
  };

  // 下一页
  const nextPage = () => {
    if (page < pageCount - 1) {
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // 上一页
  const prevPage = () => {
    if (page > 0) {
      setState((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  // 改变每页条数（重置到第一页）
  const changePageSize = (size: number) => {
    setState((prev) => ({ ...prev, pageSize: size, page: 0 }));
  };

  return {
    data,
    page,
    pageSize,
    totalSize,
    pageCount,
    loading,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
  };
}
