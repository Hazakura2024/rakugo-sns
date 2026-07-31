import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function SettingPage() {
  return (
    <div className="flex h-screen w-full ">
      <aside className="w-20 border-r"></aside>
      <div className="flex flex-col w-full">
        <header className="border p-1">
          <Link href="/" className="">
            <ArrowLeft className="t-0 l-0 w-10 h-10"></ArrowLeft>
          </Link>
        </header>
        <div className="flex flex-col p-4 gap-4">
          <Link href="/setting/account" className="">
            アカウント
          </Link>
          <Link href="/setting" className="">
            コンテンツ
          </Link>
          <Link href="/setting" className="">
            テーマ
          </Link>
          <Link href="/setting" className="">
            情報
          </Link>
        </div>
      </div>
      <aside className="w-20 border-l"></aside>
    </div>
  );
}

export default SettingPage;
