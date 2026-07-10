"use server";

import { error } from "console";
import { success, z } from "zod";

export type LoginFormState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | null;

const loginSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z
    .string()
    .min(8, { message: "有効なパスワードを入力してください。" }),
});

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const validationFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      success: false,
      errors: z.flattenError(validationFields.error).fieldErrors,
    };
  }

  const { email, password } = validationFields.data;

  try {
    console.log(email);
    console.log(password);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "ログインに失敗しました。",
    };
  }
}
