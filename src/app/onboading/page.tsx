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

export default function OnboardingPage() {
  //   const [state, formAction, isPending] = useActionState(OnboardingAction, null);

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-background">
      <div className="text-5xl font-bold">ようこそ。SNSの世界へ。</div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl"></CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <form action={} className="flex flex-col space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userName"></Label>
                <Input
                  id="userName"
                  name="userName"
                  type="userName"
                  placeholder="ユーザーid"
                ></Input>
                {/* {state?.errors?.userName && (
                  <p className="text-sm text-red-500">
                    {state.errors.userName[0]}
                  </p>
                )} */}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name"></Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="ユーザー名"
                ></Input>
                {/* {state?.errors?.name && (
                  <p className="text-sm text-red-500">
                    {state.errors.name[0]}
                  </p>
                )} */}
              </div>

              <Button className="bg-blue-500" disabled={}>
                新規登録
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
