"use client";

import { Heart } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { PostWithLikeStatus } from "@/types/post";
import { toggleLikeAction } from "@/app/actions/like";

export function LikeButton({
  userId,
  post,
}: {
  userId: string;
  post: PostWithLikeStatus;
}) {
  //   const [isLiked, setIsLiked] = useState(false);
  //   const [likesCount, setLikesCount] = useState(0);

  const [isPending, startTransition] = useTransition();

  const [optimisticState, setOptimisticState] = useOptimistic(
    { isLiked: post.isLiked, likesCount: post._count.likes },
    (current) => ({
      isLiked: !current.isLiked,
      likesCount: current.isLiked
        ? current.likesCount - 1
        : current.likesCount + 1,
    }),
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticState(null);
      try {
        await toggleLikeAction(userId, post);
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <div className="flex w-12">
      <button onClick={handleLike} disabled={isPending}>
        <Heart
          className={`h-5 w-5 mx-1 transition-all duration-300 ease-out active:scale-95 ${optimisticState.isLiked ? "text-red-500 fill-red-500" : ""}`}
        ></Heart>
      </button>
      {/* <div className="relative h-5 w-5 ">
                        <Image fill className="" src="/images/iki.png" alt="" />
                      </div> */}
      {optimisticState.likesCount !== 0 ? (
        <div>{optimisticState.likesCount}</div>
      ) : null}
    </div>
  );
}
