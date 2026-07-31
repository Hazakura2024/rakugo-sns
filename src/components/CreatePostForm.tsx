"use client";

import { useAction } from "next-safe-action/hooks";
import { createPostAction } from "@/app/actions/post";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function CreatePostForm() {
  const { execute, isExecuting } = useAction(createPostAction);

  const handleAction = (formData: FormData) => {
    if (isExecuting) return;
    const content = formData.get("content") as string;

    execute({ content });
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
