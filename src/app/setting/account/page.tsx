import { logoutAction } from "@/app/actions/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function AccountSettingPage() {
  return (
    <div className="flex h-screen w-full ">
      <aside className="w-20 border-r"></aside>
      <div className="flex flex-col w-full">
        <header className="border p-1">
          <Link href="/setting" className="">
            <ArrowLeft className="t-0 l-0 w-10 h-10"></ArrowLeft>
          </Link>
        </header>
        <div className="flex flex-col p-4 gap-4">
          <Link href="/setting/account" className=""></Link>
          <Link href="/setting" className="">
            情報
          </Link>
          <Link href="/setting" className="">
            パスワードの変更
          </Link>
          <form action={logoutAction}>
            <button className="w-full text-left" type="submit">
              <div className="text-red-500">ログアウト</div>
            </button>
          </form>
        </div>
      </div>
      <aside className="w-20 border-l"></aside>
    </div>
  );
}

export default AccountSettingPage;
