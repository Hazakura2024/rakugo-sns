# データベース設計と自動化仕様 (Database & Triggers)

本書では、本プロジェクトにおける Prisma スキーマ設計、ユーザー識別子の設計方針、および Supabase Auth と連携する SQL トリガーの仕様について定義します。

## 1. ユーザー識別子の設計思想 (`username` vs `name`)

システム上の識別性と、SNSとしての柔軟性を両立するため、ユーザー名に関するカラムを明確に2つに分離しています。

| カラム名   | 役割                                            | 一意性 (Unique)   | 変更頻度   | 文字種・制約                                   |
| :--------- | :---------------------------------------------- | :---------------- | :--------- | :--------------------------------------------- |
| `username` | システム用識別子（URL、メンション `@username`） | **必須 (Unique)** | 極めて低い | 半角英数字・アンダースコア (`^[a-zA-Z0-9_]+$`) |
| `name`     | 画面表示用の名前（表示名）                      | 不要              | 高い       | 自由（日本語、絵文字、空白可）                 |

---

## 2. Prisma スキーマ定義 (`schema.prisma`)

ユーザーテーブル (`User`) の基本設計です。主キー `id` は Supabase Auth の `auth.users.id` (UUID) と 1:1 で一致させます。

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id // Supabase auth.users.id (UUID)
  email     String   @unique
  username  String   @unique // URL / メンション用（一意制約）
  name      String           // 表示名
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // リレーション（投稿など）
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 3. Supabase SQL トリガー仕様 (Auth連携自動化)

### なぜ Next.js 側ではなく SQL トリガーで作成するのか？

サインアップ直後に Next.js (Prisma) 側で `prisma.user.create()` を呼ぶ構成にすると、非同期処理の競合（レースコンディション）や、将来 Google/GitHub 等の OAuth ログインを追加した際の実装漏れ・データ不整合の原因になります。
そのため、**「Supabase Auth にレコードが作成された瞬間に、DB層で確実に Public テーブルの User を自動生成する」** アプローチを採用しています。

### トリガー関数とイベント定義

新規登録時、`username` はユーザー入力を待たずに UUID の先頭8文字を使って `user_xxxxxxxx` の形式で自動生成します。

```sql
-- 1. ユーザー自動作成関数の定義
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public."User" (
    id,
    email,
    username,
    name,
    "createdAt",
    "updatedAt"
  )
  values (
    new.id,
    new.email,
    -- UUIDの先頭8文字を切り出して一意な初期ユーザーネームを生成
    'user_' || substr(new.id::text, 1, 8),
    '名無しユーザー',
    new.created_at,
    new.created_at
  );

  return new;
end;
$$ language plpgsql security definer;

-- 2. auth.users 監視トリガーの設定
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 4. オンボーディングとの連携フロー

1. **Sign Up:** ユーザーはメールアドレスとパスワードのみで登録。
2. **自動実行 (DB):** 上記トリガーが発火し、`User` テーブルに初期レコードが作成される。
3. **リダイレクト:** クライアントは `/onboarding` へ遷移。
4. **初期設定:** ユーザーが希望する本命の `username` と `name` を入力し、専用 Action (`setupAccountAction`) を経由して `UPDATE` を実行する。
