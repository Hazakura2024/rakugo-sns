import prisma from "@/lib/prisma";
import { cache } from "react";

export async function setUpUserName(
  userId: string,
  userName: string,
  name: string,
) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      username: userName,
      name: name,
    },
  });
}

export async function existingUser(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

// ユーザー名からプロフィールを取得
export const getUserByUsername = cache(async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    // フォロー/フォロワー数を取得したい場合は include で指定
    include: { _count: { select: { followers: true, following: true } } },
  });

  return user;
});
