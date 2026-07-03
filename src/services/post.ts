import prisma from "@/lib/prisma";

export async function insertPost(content: string, authorId: string) {
  return await prisma.post.create({
    data: { content, authorId },
  });
}
