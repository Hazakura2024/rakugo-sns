"use server";

import { success, z } from "zod";
import { Post } from "@/generated/client";
import { getAllPosts, insertPost } from "@/services/post";
import { revalidatePath } from "next/cache";
import { authActionClient } from "@/lib/safe-acction";

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

// export async function createPostAction(formData: FormData) {
//   const validationFields = postSchema.safeParse({
//     content: formData.get("content") as string,
//   });

//   if (!validationFields.success) {
//     return {
//       success: false,
//       errors: validationFields.error,
//       message: "入力内容にエラーがあります",
//     };
//   }

//   const { content } = validationFields.data;

//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return {
//       success: false,
//       errors: "undefined user",
//       message: "入力内容にエラーがあります",
//     };
//   }

//   // 手動作成した仮ユーザー
//   const authorId = user?.id;

//   try {
//     const res = await insertPost(content, authorId);
//     console.log(res);

//     // Data Cacheにはデフォルトのtagとして、Route情報を元にしたタグが内部的に設定されており、revalidatePath()はこの特殊なタグを元に関連するData Cacheのrevalidateを実現しています。
//     revalidatePath("/");

//     // return { success: true, error: null };
//   } catch (error) {
//     console.log(error);
//     // return { error: "投稿のデータベースへの保存に失敗しました。" };
//   }
// }

export async function getAllPostsAction(): Promise<Post[]> {
  return await getAllPosts();
}
