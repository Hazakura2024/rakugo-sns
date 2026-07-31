"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type SignUpFormState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | null;

const signUpSchema = z.object({
  email: z.email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上にしてください。" })
    .regex(/[A-Z]/, { message: "大文字を少なくとも1文字含めてください" })
    .regex(/[0-9]/, { message: "数字を少なくとも1文字含めてください" }),
});

export async function signUpAction(
  prevState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validationFields = signUpSchema.safeParse({
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
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Auth Error:", error);
      return {
        success: false,
        message: "登録に失敗しました。",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "登録に失敗しました。",
    };
  }

  redirect("/onboarding");
}

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
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        success: false,
        message: "メールアドレスかパスワードが間違っています。",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ログインに失敗しました。",
    };
  }
  revalidatePath("/", "layout");

  redirect("/");
}

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("ログアウトエラー", error.message);
    throw new Error("ログアウトに失敗しました。");
  }

  revalidatePath("/");
  redirect("/login");
}
