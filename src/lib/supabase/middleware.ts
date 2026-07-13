import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSection(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 学習メモ: cookieの読み書き設定をsupabaseクライアントを作って行う
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // 学習メモ: まず受け取ったリクエスト自体の中身を新しいcookieで上書きする
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          // 学習メモ: レスポンスオブジェクトを作り直す
          supabaseResponse = NextResponse.next({
            request,
          });
        },
      },
    },
  );
  // 学習メモ: ユーザー情報の取得（ここでCookieの有効性チェックが走る）,getUserはBANされてないかとかも確認してくれる
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 学習メモ: ログインしてたらメイン、してなかったらログインページの制御
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const authRoutes = ["/login", "signup"];
  const isAuthRoute = authRoutes.includes(pathname);

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return supabaseResponse;
}
