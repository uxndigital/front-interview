import { range } from "lodash";

const sleep = (duration: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );
};

export interface PageData {
  data: number[];
  totalSize: number;
  pageCount: number;
}

interface GetDataParams {
  page: number;
  pageSize: number;
}

export default async function getData({
  page,
  pageSize,
}: GetDataParams): Promise<PageData | null> {
  const maxValue = 100;
  const pageCount = Math.ceil(maxValue / pageSize);

  if (
    typeof page !== "number" ||
    typeof pageSize !== "number" ||
    pageSize <= 0 ||
    page < 1 ||
    page > pageCount
  ) {
    return null;
  }

  const dataSource = range(0, pageCount).map((pageIndex:number) => {
    return {
      data: range(pageSize * pageIndex, pageSize * pageIndex + pageSize).map(
        (value:number) => value + 1,
      ),
      totalSize: maxValue,
      pageCount,
    };
  });

  // 模拟网络延迟 3 秒
  await sleep(3000);

  return dataSource[page - 1];
}
