import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPostAction, getAllPostsAction } from "./actions/post";
import { Post } from "@/generated/client";

export default async function Home() {
  const posts = await getAllPostsAction();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* <header className="sticky bg- top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div>ロゴ</div>
          <nav className="flex items-center gap-4">
            <p>ページ１</p>
            <p>ページ２</p>
            <p>ページ３</p>
          </nav>
        </div>
      </header> */}
      <div className="flex  flex-1">
        <aside className="w-14 sticky flex flex-col items-center justify-start border-r gap-5">
          <img src="/images/main_logo.png" alt="アイコン" className="p-1" />
          <nav className="flex items-center flex-col gap-8 p-3">
            <img src="/images/home.png" alt="" />
            <img src="/images/hashtag.png" alt="" />
            <img src="/images/notification.png" alt="" />
            <img src="/images/message.png" alt="" />
            <img src="/images/bookmark.png" alt="" />
            <img src="/images/profile.png" alt="" />
            <img src="/images/detail.png" alt="" />
          </nav>
        </aside>
        <div className="mx-auto w-full max-w-7xl flex flex-1 flex-col items-start gap-6 py-6">
          <header className="h-8 border-b w-full flex items-center">
            <h1>ホーム</h1>
          </header>
          <main className="flex flex-col w-full">
            <div className="grow border-b w-full h-24">
              <form action={createPostAction}>
                <Textarea className="border" name="content"></Textarea>
                <Button className="bg-blue-500" type="submit">
                  投稿
                </Button>
              </form>
            </div>
            <div>
              {posts.map((post) => (
                <div key={post.id} className="border p-2">
                  <div>{String(post.createdAt)}</div>
                  <div>{post.content}</div>
                </div>
              ))}
              <div>ポスト1</div>
              <div>ポスト1</div>
              <div>ポスト1</div>
              <div>ポスト1</div>
              <div>ポスト1</div>
            </div>
          </main>
        </div>
        <aside className="w-80 sticky flex flex-col items-center justify-start border-l gap-5 p-3">
          <div className=" h-8 w-full rounded-sm bg-muted/50">
            <div>🔍検索</div>
          </div>
          <div className="h-40 w-full rounded-sm bg-muted/50">
            <div></div>
          </div>
        </aside>
      </div>
      <footer className="border-t bg-muted/50 py-6 text-center text-sm text-muted-foreground">
        ライセンス
      </footer>
    </div>
  );
}
