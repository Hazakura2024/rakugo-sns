import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-background">
      <div className="text-5xl font-bold">すべての話題が、ここに。</div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <form className="flex flex-col space-y-6">
              <div className="space-y-2">
                <Label></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="メールアドレス"
                ></Input>
                {}
              </div>
              <div className="space-y-2">
                <Label></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="パスワード"
                ></Input>
                {}
              </div>
              <Button className="bg-blue-500">ログイン</Button>
            </form>
          </div>
        </CardContent>
        <CardFooter>
          <div>アカウントをお持ちではないですか？</div>
          <Link href="/signup" className="text-blue-500 hover:underline ml-1">
            新規登録
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
