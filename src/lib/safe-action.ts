import { createSafeActionClient } from "next-safe-action";
import { createClient } from "./supabase/server";

// studyMemo: 誰でも叩ける基本のアクションクライアント
export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしていません");
  }

  return next({ ctx: { userId: user.id } });
});
