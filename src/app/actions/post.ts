"use server";

import { success, z } from "zod";
import { Post } from "@/generated/client";
import { getAllPosts, insertPost } from "@/services/post";
import { revalidatePath } from "next/cache";
import { error } from "console";

const postSchema = z.object({
  content: z
    .string({ message: "文字列を入力してください。" })
    .min(1, { message: "投稿内容を入力してください。" })
    .max(280, { message: "280文字以内で入力してください。" }),
});

export async function createPostAction(formData: FormData) {
  const validationFields = postSchema.safeParse({
    content: formData.get("content") as string,
  });

  if (!validationFields.success) {
    return {
      success: false,
      errors: validationFields.error,
      message: "入力内容にエラーがあります",
    };
  }

  const { content } = validationFields.data;

  // 手動作成した仮ユーザー
  const authorId = "clyja2ddb000101k93m6a0h6c";

  try {
    const res = await insertPost(content, authorId);
    console.log(res);

    // Data Cacheにはデフォルトのtagとして、Route情報を元にしたタグが内部的に設定されており、revalidatePath()はこの特殊なタグを元に関連するData Cacheのrevalidateを実現しています。
    revalidatePath("/");

    // return { success: true, error: null };
  } catch (error) {
    console.log(error);
    // return { error: "投稿のデータベースへの保存に失敗しました。" };
  }
}

export async function getAllPostsAction(): Promise<Post[]> {
  return await getAllPosts();
}
