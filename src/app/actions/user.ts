"use server";

import { z } from "zod";

import { authActionClient } from "@/lib/safe-action";
import { existingUser, setUpUserName } from "@/services/user";
import { redirect } from "next/navigation";

const updateProfileSchema = z.object({
  username: z
    .string()
    .min(5, { message: "ユーザーidは5文字以上にしてください。" })
    .max(15, { message: "ユーザーidは15文字以下にしてください" })
    .regex(/^[a-zA-Z0-9_]+$/),
  name: z
    .string()
    .min(1, { message: "ユーザー名は1文字以上にしてください。" })
    .max(20, { message: "ユーザー名は20文字以下にしてください" }),
});

export const setUpAccountNameAction = authActionClient
  .inputSchema(updateProfileSchema)
  .action(async ({ parsedInput, ctx }) => {
    const existUser = await existingUser(parsedInput.username);

    if (existUser && existUser.id !== ctx.userId) {
      throw new Error("このユーザーidは使用されています。");
    }

    setUpUserName(ctx.userId, parsedInput.username, parsedInput.name);

    redirect("/");
  });
