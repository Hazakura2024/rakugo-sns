"use client";

import { useAction } from "next-safe-action/hooks";
import { createPostAction } from "@/app/actions/post";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function CreatePostForm() {
  const { executeAsync, isExecuting } = useAction(createPostAction);

  const handleAction = async (formData: FormData) => {
    if (isExecuting) return;
    const content = formData.get("content") as string;

    await executeAsync({ content });
  };

  return (
    <form className="flex flex-col  bg-background" action={handleAction}>
      <Textarea className="border" name="content"></Textarea>
      <Button
        className="bg-blue-500 self-end"
        type="submit"
        disabled={isExecuting}
      >
        投稿
      </Button>
    </form>
  );
}
