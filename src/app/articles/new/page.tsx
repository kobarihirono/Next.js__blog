"use client";

// import { createArticle } from "@/pages/api/articles/articles";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateArticle = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = await fetch(`${API_URL}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content }),
    });

    // console.log("new article");
    // console.log(newArticle);

    // 新規投稿作成機能のエラーハンドリング
    // if (!newArticle.ok) {
    //   const errorData = await newArticle.json();
    //   console.error("Error Response:", errorData);
    // } else {
    //   console.log("OK");
    // }

    setLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ新規作成</h2>
      <form
        action=""
        className="bg-slate-200 p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">URL</label>
          <input
            type="text"
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">本文</label>
          <textarea
            className="bg-white shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`py-2 px-4 border rounded-md ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-500"
          }`}
          disabled={loading}
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
