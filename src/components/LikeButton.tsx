"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };
  return (
    <div className="flex">
      <button onClick={handleLike}>
        <Heart
          className={`h-5 w-5 ${isLiked ? "text-red-500 fill-red-500" : ""}`}
        ></Heart>
      </button>
      {/* <div className="relative h-5 w-5 ">
                        <Image fill className="" src="/images/iki.png" alt="" />
                      </div> */}
      <div>{likesCount}</div>
    </div>
  );
}
