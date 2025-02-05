import { Article } from "./types";
import { notFound } from "next/navigation";

// 投稿一覧ページのデータ受け渡し
export const getAllArticles = async (): Promise<Article[]> => {
  // 投稿一覧は更新頻度が高いのでSSR処理にする
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); // no-storeでSSR

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const articles = await res.json();
  return articles;
};

// 詳細ページへのデータ受け渡し
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

// 投稿の新規登録
export const createArticles = async (
  id: string,
  title: string,
  content: string,
): Promise<Article> => {
  const currentDateTime = new Date().toISOString();

  // idごとの情報を取得
  const res = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, content, createAt: currentDateTime }),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  // 意図的に待ち時間を発生させる
  await new Promise((resolve) => setTimeout(resolve, 100));

  const newArticle = await res.json();
  return newArticle;
};

// 投稿の削除
export const deleteArticle = async (id: string): Promise<Article> => {
  // idごとの情報を取得
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  // 意図的に待ち時間を発生させる
  await new Promise((resolve) => setTimeout(resolve, 100));

  const deleteArticle = await res.json();
  return deleteArticle;
};
