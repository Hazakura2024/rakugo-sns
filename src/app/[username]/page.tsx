// src/app/[username]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserByUsername } from "@/services/user";
import { getPostsByAuthorWithLikeStatus } from "@/services/post";
import { PostCard } from "@/components/PostCard"; // named exportなので中括弧
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  // 1. ログイン中のユーザー情報を取得（いいねステータスや本人判定用）
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const currentUserId = authUser?.id;

  // 2. 表示対象のユーザー情報を取得
  const targetUser = await getUserByUsername(username);
  if (!targetUser) {
    notFound();
  }

  const isOwner = currentUserId === targetUser.id;

  // 3. 投稿一覧の取得（いいねステータス込み）
  const posts = await getPostsByAuthorWithLikeStatus(
    targetUser.id,
    currentUserId,
  );

  return (
    <main className="max-w-2xl mx-auto border-x min-h-screen pb-20">
      {/* プロフィールヘッダー */}
      <section className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            {targetUser.image ? (
              <img
                src={targetUser.image}
                alt={targetUser.name}
                className="w-16 h-16 rounded-full mb-2 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full mb-2 bg-gray-200" /> // 代替アイコン
            )}
            <h1 className="text-xl font-bold">{targetUser.name}</h1>
            <p className="text-muted-foreground text-sm">
              @{targetUser.username}
            </p>
          </div>

          <div>
            {isOwner ? (
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/setting/account">プロフィールを編集</Link>
              </Button>
            ) : (
              <Button className="rounded-full">フォロー</Button>
            )}
          </div>
        </div>
      </section>

      {/* タイムライン */}
      <section>
        {posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            まだ投稿がありません
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              userId={currentUserId ?? ""} // 未ログイン時は空文字を渡す
            />
          ))
        )}
      </section>
    </main>
  );
}
