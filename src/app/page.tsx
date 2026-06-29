import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky bg- top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div>ロゴ</div>
          <nav className="flex items-center gap-4">
            <p>ページ１</p>
            <p>ページ２</p>
            <p>ページ３</p>
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl flex flex-1 items-start gap-6 px-4 py-6">
        <aside className="sticky top-20 hidden w-64 shrink-0 md:block">
          サイドバー
        </aside>
        <main className="flex-1">
          <div>
            <div>メイン</div>
            <div>内容</div>
          </div>
        </main>
      </div>
      <footer className="border-t bg-muted/50 py-6 text-center text-sm text-muted-foreground">
        ライセンス
      </footer>
    </div>
  );
}
