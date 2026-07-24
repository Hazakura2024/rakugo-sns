import Image from "next/image";
import TimeDisplay from "./ui/timeDisplay";
import { Heart, Repeat } from "lucide-react";
import { Post } from "@/generated/client";
import { LikeButton } from "./LikeButton";

export async function PostCard({ post }: { post: Post }) {
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
          <TimeDisplay createdAt={post.createdAt}></TimeDisplay>
          <div className="break-words">{post.content}</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <LikeButton></LikeButton>

        <div className="relative flex items-center">
          <Repeat className="h-5 w-5"></Repeat>
          {/* <div className="relative h-5 w-5 ">
                        <Image
                          fill
                          className=""
                          src="/images/miyabi.png"
                          alt=""
                        />
                      </div> */}
          <div>0</div>
        </div>
      </div>
    </div>
  );
}
