import { Article } from "./types";
import { notFound } from "next/navigation";

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); // no-storeでSSR

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  // 意図的に待ち時間を発生させる
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  const articles = await res.json();
  return articles;
};

export const getDetailArticles = async (id: string): Promise<Article> => {
  // idごとの情報を取得
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 60 },
  }); // ISR,再生成

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  // 意図的に待ち時間を発生させる
  await new Promise((resolve) => setTimeout(resolve, 100));

  const article = await res.json();
  return article;
};
