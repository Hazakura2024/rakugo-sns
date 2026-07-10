"use client";

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
import { useActionState } from "react";
import { signUpAction } from "@/app/actions/auth";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-background">
      <div className="text-5xl font-bold">すべての話題が、ここに。</div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <form action={formAction} className="flex flex-col space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userName"></Label>
                <Input
                  id="userName"
                  name="userName"
                  type="userName"
                  placeholder="ユーザー名"
                ></Input>
                {state?.errors?.userName && (
                  <p className="text-sm text-red-500">
                    {state.errors.userName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email"></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="メールアドレス"
                ></Input>
                {state?.errors?.email && (
                  <p className="text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password"></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="パスワード"
                ></Input>
                {state?.errors?.password && (
                  <p className="text-sm text-red-500">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>
              <Button className="bg-blue-500" disabled={isPending}>
                ログイン
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter>
          <div>アカウントをお持ちですか？</div>
          <Link href="/login" className="text-blue-500 hover:underline ml-1">
            ログイン
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
