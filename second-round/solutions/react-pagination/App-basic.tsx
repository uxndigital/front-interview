import { useEffect, useState } from "react";
import "./App.css";
import getData, { PageData } from "./data";

interface State {
  data: number[];
  page: number;
  pageSize: number;
  totalSize: number;
  pageCount: number;
  loading: boolean;
}

function App() {
  const [state, setState] = useState<State>({
    data: [],
    page: 0,
    pageSize: 10,
    totalSize: 0,
    pageCount: 0,
    loading: false,
  });

  const { data, page, pageSize, totalSize, pageCount, loading } = state;

  // 获取数据的函数
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

  // 当 page 或 pageSize 变化时，重新获取数据
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  // 上一页
  const handlePrev = () => {
    if (page > 0) {
      setState((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  // 下一页
  const handleNext = () => {
    if (page < pageCount - 1) {
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>React 分页示例</h1>

      {/* 加载状态 */}
      {loading && (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          加载中...
        </div>
      )}

      {/* 数据展示 */}
      {!loading && (
        <>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            <h3>当前页数据：</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {data.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "5px 10px",
                    background: "#f0f0f0",
                    borderRadius: "4px",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* 分页信息 */}
          <div style={{ marginBottom: "20px", color: "#666" }}>
            <p>
              📄 第 {page + 1} 页 / 共 {pageCount} 页
            </p>
            <p>
              📦 每页 {pageSize} 条 | 总计 {totalSize} 条
            </p>
          </div>

          {/* 翻页按钮 */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handlePrev}
              disabled={page === 0}
              style={{
                padding: "8px 16px",
                cursor: page === 0 ? "not-allowed" : "pointer",
                opacity: page === 0 ? 0.5 : 1,
              }}
            >
              ◄ 上一页
            </button>
            <button
              onClick={handleNext}
              disabled={page >= pageCount - 1}
              style={{
                padding: "8px 16px",
                cursor: page >= pageCount - 1 ? "not-allowed" : "pointer",
                opacity: page >= pageCount - 1 ? 0.5 : 1,
              }}
            >
              下一页 ►
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
