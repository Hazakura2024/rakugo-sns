import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header>
        <div>
          <div>ロゴ</div>
        </div>
      </header>
      <div>
        <aside></aside>
        <main>
          <div>
            <div>メイン</div>
          </div>
        </main>
      </div>
      <footer>ライセンス</footer>
    </div>
  );
}
