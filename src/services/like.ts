import { Post, User } from "@/generated/client";
import prisma from "@/lib/prisma";

export async function addLike(post: Post, user: User) {
  return prisma.like.create({
    data: { postId: post.id, userId: user.id },
  });
}

export async function removeLike(post: Post, user: User) {
  return prisma.like.deleteMany({
    where: { postId: post.id, userId: user.id },
  });
}

export async function checkIsLiked(post: Post, user: User) {
  const like = prisma.like.findFirst({
    where: { postId: post.id, userId: user.id },
    select: { id: true },
  });

  return !!like;
}
