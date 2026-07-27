import { Post, User } from "@/generated/client";
import prisma from "@/lib/prisma";

export async function addLike(post: Post, userId: string) {
  return prisma.like.create({
    data: { postId: post.id, userId: userId },
  });
}

export async function removeLike(post: Post, userId: string) {
  return prisma.like.deleteMany({
    where: { postId: post.id, userId: userId },
  });
}

export async function checkIsLiked(post: Post, userId: string) {
  const like = prisma.like.findFirst({
    where: { postId: post.id, userId: userId },
    select: { id: true },
  });

  return !!like;
}
