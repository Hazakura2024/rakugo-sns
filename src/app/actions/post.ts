"use server";

import { z } from "zod";
import { Post } from "@/generated/client";
import { getAllPosts, insertPost } from "@/services/post";
import { revalidatePath } from "next/cache";
import { authActionClient } from "@/lib/safe-action";

const postSchema = z.object({
  content: z
    .string({ message: "文字列を入力してください。" })
    .min(1, { message: "投稿内容を入力してください。" })
    .max(280, { message: "280文字以内で入力してください。" }),
});

export const createPostAction = authActionClient
  .inputSchema(postSchema)
  // クライアントからは FormData が丸ごと飛んでくるが、
  // next-safe-action が裏側でパースして、ここで安全な parsedInput に変換してくれる
  .action(async ({ parsedInput, ctx }) => {
    await insertPost(parsedInput.content, ctx.userId);
    revalidatePath("/");

    return { success: true };
  });

export async function getAllPostsAction(): Promise<Post[]> {
  return await getAllPosts();
}
