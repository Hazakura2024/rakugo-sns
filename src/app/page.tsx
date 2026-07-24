import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPostAction, getAllPostsAction } from "./actions/post";
import { Heart } from "lucide-react";
import { Repeat } from "lucide-react";
import Image from "next/image";
import TimeDisplay from "@/components/ui/timeDisplay";
import { PostCard } from "@/components/PostCard";

export default async function Home() {
  const posts = await getAllPostsAction();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <div className="flex  flex-1 overflow-hidden">
        <aside className="w-14 flex flex-col items-center justify-start border-r gap-5 w-4">
          <div className="relative w-8 p-8">
            <Image
              fill
              src="/images/main_logo.png"
              alt="アイコン"
              className="p-1 w-4 object-contain"
            />
          </div>
          <nav className="relative flex items-center flex-col gap-8 p-3">
            <div className="relative w-5 p-5">
              <Image
                fill
                className="object-contain"
                src="/images/home.png"
                alt=""
              />
            </div>
            <div className="relative w-5 p-5">
              <Image
                fill
                className="object-contain"
                src="/images/hashtag.png"
                alt=""
              />
            </div>
            <div className="relative w-5 p-5">
              <Image
                fill
                className="object-contain"
                src="/images/notification.png"
                alt=""
              />
            </div>
            <div className="relative w-5 p-5">
              <Image
                className="object-contain"
                fill
                src="/images/message.png"
                alt=""
              />
            </div>
            <div className="relative w-5 p-5">
              <Image
                className="object-contain"
                fill
                src="/images/bookmark.png"
                alt=""
              />
            </div>
            <div className="relative w-5 p-5">
              <Image
                className="object-contain"
                fill
                src="/images/profile.png"
                alt=""
              />
            </div>
            <div className="relative w-5 p-5">
              <Image
                className="object-contain"
                fill
                src="/images/detail.png"
                alt=""
              />
            </div>
          </nav>
        </aside>
        <div className="flex flex-1 flex-col items-start min-w-0 gap-6 py-6 overflow-y-auto">
          <header className="border-b w-full z-10 flex flex-col items-center shrink-0 sticky top-0 bg-background">
            <h1>ホーム</h1>
            <div className="shrink-0 border-b w-full h-24">
              <form
                className="flex flex-col  bg-background"
                action={createPostAction}
              >
                <Textarea className="border" name="content"></Textarea>
                <Button className="bg-blue-500 self-end" type="submit">
                  投稿
                </Button>
              </form>
            </div>
          </header>
          <main className="flex flex-col w-full">
            <div>
              {posts.map((post) => (
                <PostCard key={post.id} post={post}></PostCard>
              ))}
            </div>
          </main>
        </div>
        <aside className="hidden w-80 md:flex flex-col items-center justify-start border-l gap-5 p-3 insert-y-0 right-0 ">
          <div className=" h-8 w-full rounded-sm bg-muted/50">
            <div>🔍検索</div>
          </div>
          <div className="h-40 w-full rounded-sm bg-muted/50">
            <div>aiによるおすすめとか表示出来たら楽しですヨ</div>
          </div>
        </aside>
      </div>
      <footer className="border-t bg-muted/50 py-6 text-center text-sm text-muted-foreground">
        ライセンス
      </footer>
    </div>
  );
}
