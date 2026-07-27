"use client";

import { Repeat } from "lucide-react";
import { useState } from "react";

export function RepostButton() {
  const [isReposted, setIsReposted] = useState(false);
  const [RepostsCount, setRepostsCount] = useState(0);

  const handleRepost = async () => {
    setIsReposted(!isReposted);
    setRepostsCount((prev) => (isReposted ? prev - 1 : prev + 1));
  };
  return (
    <div className="flex w-12">
      <button onClick={handleRepost}>
        <Repeat
          className={`h-5 w-5 mx-1 transition-all duration-300 ease-out active:scale-95 ${isReposted ? "text-green-500 " : ""}`}
        ></Repeat>
      </button>
      {/* <div className="relative h-5 w-5 ">
                        <Image fill className="" src="/images/iki.png" alt="" />
                      </div> */}
      {RepostsCount !== 0 ? <div>{RepostsCount}</div> : null}
    </div>
  );
}
