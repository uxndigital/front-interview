import { useEffect } from "react";
import "./App.css";
import getData from './data.ts';

const page = 0;
const pageSize = 10;

function App() {

  useEffect(() => {
    // TODO: 实现数据获取和存储
    getData({ page, pageSize }).then((pageData) => {
      // 注意这里有延迟
      if (pageData !== null) {
        const { data, totalSize, pageCount } = pageData;
        console.log("data", data);
        console.log("totalSize", totalSize);
        console.log("pageCount", pageCount);
      }
    });
  }, []);

  return (
    <div>
      <h1>React 分页</h1>
      {/* TODO: 实现页面 */}
    </div>
  );
}

export default App;
