import { useState } from "react";
import "./App.css";
import { usePagination } from "./usePagination";

function App() {
  const {
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
  } = usePagination({ initialPageSize: 10 });

  const [jumpPage, setJumpPage] = useState<string>("");

  // 跳转到指定页
  const handleJump = () => {
    const targetPage = Number(jumpPage) - 1;
    if (!isNaN(targetPage) && targetPage >= 0 && targetPage < pageCount) {
      goToPage(targetPage);
      setJumpPage("");
    }
  };

  // 页码列表（简化版：只显示部分页码）
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (pageCount <= maxVisible) {
      // 总页数少于最大显示数，全部显示
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      // 显示部分页码 + 省略号
      if (page < 3) {
        pages.push(0, 1, 2, 3, "...", pageCount - 1);
      } else if (page > pageCount - 4) {
        pages.push(
          0,
          "...",
          pageCount - 4,
          pageCount - 3,
          pageCount - 2,
          pageCount - 1,
        );
      } else {
        pages.push(0, "...", page - 1, page, page + 1, "...", pageCount - 1);
      }
    }

    return pages;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        React 分页示例（进阶版）
      </h1>

      {/* 加载状态 */}
      {loading && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
          }}
        >
          ⏳ 加载中...
        </div>
      )}

      {/* 数据展示 */}
      {!loading && (
        <>
          {/* 数据区域 */}
          <div
            style={{
              padding: "20px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              marginBottom: "30px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginTop: 0 }}>📊 当前页数据：</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
                gap: "10px",
              }}
            >
              {data.map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "12px",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 分页信息 */}
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              background: "#f0f0f0",
              borderRadius: "6px",
            }}
          >
            <p style={{ margin: "5px 0" }}>
              📄 第 <strong>{page + 1}</strong> 页 / 共{" "}
              <strong>{pageCount}</strong> 页
            </p>
            <p style={{ margin: "5px 0" }}>
              📦 每页 <strong>{pageSize}</strong> 条 | 总计{" "}
              <strong>{totalSize}</strong> 条
            </p>
          </div>

          {/* 每页条数选择 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px" }}>每页显示：</label>
            <select
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <option value="5">5 条</option>
              <option value="10">10 条</option>
              <option value="20">20 条</option>
              <option value="50">50 条</option>
            </select>
          </div>

          {/* 页码列表 */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {renderPageNumbers().map((p, index) => {
              if (p === "...") {
                return (
                  <span key={`ellipsis-${index}`} style={{ padding: "8px" }}>
                    ...
                  </span>
                );
              }
              const pageNum = p as number;
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    background: isActive ? "#007bff" : "white",
                    color: isActive ? "white" : "#333",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>

          {/* 翻页控制 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={prevPage}
              disabled={page === 0}
              style={{
                padding: "10px 20px",
                cursor: page === 0 ? "not-allowed" : "pointer",
                opacity: page === 0 ? 0.5 : 1,
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              ◄ 上一页
            </button>

            <button
              onClick={nextPage}
              disabled={page >= pageCount - 1}
              style={{
                padding: "10px 20px",
                cursor: page >= pageCount - 1 ? "not-allowed" : "pointer",
                opacity: page >= pageCount - 1 ? 0.5 : 1,
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              下一页 ►
            </button>

            {/* 跳转到指定页 */}
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <span>跳转到：</span>
              <input
                type="number"
                min="1"
                max={pageCount}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                placeholder="页码"
                style={{
                  width: "60px",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <button
                onClick={handleJump}
                style={{
                  padding: "8px 16px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                GO
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
