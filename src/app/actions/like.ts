"use server";

import { addLike, removeLike } from "@/services/like";
import { PostWithLikeStatus } from "@/types/post";
import { revalidatePath } from "next/cache";

export const toggleLikeAction = async (
  userId: string,
  post: PostWithLikeStatus,
) => {
  if (!post.isLiked) {
    await addLike(post, userId);
  } else {
    await removeLike(post, userId);
  }
  revalidatePath("/");
};
