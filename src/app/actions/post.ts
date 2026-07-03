"use server";

import { insertPost } from "@/services/post";
import { error } from "console";

export async function createPostAction(formData: FormData) {
  const content = formData.get("content") as string;

  // 手動作成した仮ユーザー
  const authorId = "clyja2ddb000101k93m6a0h6c";

  try {
    const res = await insertPost(content, authorId);
    console.log(res);
    // return { success: true, error: null };
  } catch (error) {
    console.log(error);
    // return { error: "投稿のデータベースへの保存に失敗しました。" };
  }
}
