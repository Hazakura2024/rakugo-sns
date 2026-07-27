import { getPostWithLikeStatus } from "@/services/post";

export type PostWithLikeStatus = Awaited<
  ReturnType<typeof getPostWithLikeStatus>
>[number];
