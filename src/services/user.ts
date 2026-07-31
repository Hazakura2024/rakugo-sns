import prisma from "@/lib/prisma";

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
