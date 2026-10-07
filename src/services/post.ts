import prisma from "@/lib/prisma";
import { tr } from "zod/v4/locales";

export async function insertPost(content: string, authorId: string) {
  return await prisma.post.create({
    data: { content, authorId },
  });
}

export async function getAllPosts() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostWithLikeStatus(currentUserId?: string) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true, username: true, image: true },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { userId: true },
          }
        : false,
    },
  });
  return posts.map((post) => ({
    ...post,
    likesCount: post._count.likes,
    isLiked: post.likes ? post.likes.length > 0 : false,
  }));
}

export async function getPostsByAuthorWithLikeStatus(authorId: string, currentUserId?: string) {
  const posts = await prisma.post.findMany({
    where: { authorId }, // 特定のユーザーで絞り込み
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true, username: true, image: true },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { userId: true },
          }
        : false,
    },
  });
  
  return posts.map((post) => ({
    ...post,
    likesCount: post._count.likes,
    isLiked: post.likes ? post.likes.length > 0 : false,
  }));
}
