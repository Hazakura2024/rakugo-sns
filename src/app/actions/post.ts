"use server";

import { Post } from "@/generated/client";
import { getAllPosts, insertPost } from "@/services/post";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  const content = formData.get("content") as string;

  // 手動作成した仮ユーザー
  const authorId = "clyja2ddb000101k93m6a0h6c";

  revalidatePath("/");

  try {
    const res = await insertPost(content, authorId);
    console.log(res);
    // return { success: true, error: null };
  } catch (error) {
    console.log(error);
    // return { error: "投稿のデータベースへの保存に失敗しました。" };
  }
}

export async function getAllPostsAction(): Promise<Post[]> {
  return await getAllPosts();
}
