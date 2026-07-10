"use server";

import { error } from "console";
import { success, z } from "zod";
const loginSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z
    .string()
    .min(8, { message: "有効なパスワードを入力してください。" }),
});

export async function loginAction(formData: FormData) {
  const validationFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      success: false,
      error: validationFields.success,
    };
  }

  const { email, password } = validationFields.data;

  try {
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "ログインに失敗しました。",
    };
  }
}
