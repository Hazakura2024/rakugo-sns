import Image from "next/image";
import TimeDisplay from "./ui/timeDisplay";
import { Heart, Repeat } from "lucide-react";
import { Post, User } from "@/generated/client";
import { LikeButton } from "./LikeButton";
import { RepostButton } from "./RepostButton";
import { PostWithLikeStatus } from "@/types/post";
import Link from "next/link";

export async function PostCard({
  userId,
  post,
}: {
  userId: string;
  post: PostWithLikeStatus;
}) {
  return (
    <div className="border p-2 flex flex-col">
      <div className="flex items-center gap-2">
        <div className="relative w-12 h-12 ">
          <Image
            fill
            src="/images/mock_icon.png"
            alt=""
            className="rounded-[50%]"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex gap-1">
            <Link href={"/" + post.author.username}>
              <div className="hover:underline">{post.author.name}</div>
            </Link>

            <div className="text-gray-500">@{post.author.username}</div>
            <TimeDisplay createdAt={post.createdAt}></TimeDisplay>
          </div>

          <div className="break-words">{post.content}</div>
        </div>
      </div>
      <div className="h-5 flex items-center justify-center gap-4">
        <LikeButton userId={userId} post={post}></LikeButton>

        <RepostButton></RepostButton>
      </div>
    </div>
  );
}
