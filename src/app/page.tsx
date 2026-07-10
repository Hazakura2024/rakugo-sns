import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPostAction, getAllPostsAction } from "./actions/post";
import Image from "next/image";
import TimeDisplay from "@/components/ui/timeDisplay";

export default async function Home() {
  const posts = await getAllPostsAction();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex  flex-1">
        <aside className="w-14 sticky flex flex-col items-center justify-start border-r gap-5 w-4">
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
        <div className="mx-auto w-30 max-w-7xl flex flex-1 flex-col items-start gap-6 py-6">
          <header className="h-8 border-b w-full flex items-center">
            <h1>ホーム</h1>
          </header>
          <main className="flex flex-col w-full">
            <div className="grow border-b w-full h-24">
              <form className="flex flex-col" action={createPostAction}>
                <Textarea className="border" name="content"></Textarea>
                <Button className="bg-blue-500 self-end" type="submit">
                  投稿
                </Button>
              </form>
            </div>
            <div>
              {posts.map((post) => (
                <div key={post.id} className="border p-2 flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="relative w-12 h-12 ">
                      <Image
                        fill
                        src="/images/mock_icon.png"
                        alt=""
                        className="rounded-[50%]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <TimeDisplay createdAt={post.createdAt}></TimeDisplay>
                      <div className="break-words">{post.content}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex">
                      <div>いいね</div>
                      <div>0</div>
                    </div>

                    <div className="relative flex items-center">
                      <div className="relative h-5 w-5 ">
                        <Image
                          fill
                          className=""
                          src="/images/miyabi.png"
                          alt=""
                        />
                      </div>
                      <div>0</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
        <aside className="w-90 sticky flex flex-col items-center justify-start border-l gap-5 p-3">
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
