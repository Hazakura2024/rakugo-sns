# 全体アーキテクチャ設計 (Architecture Overview)

本書では、本プロジェクトにおける全体的なシステムアーキテクチャ、技術スタック、およびフロントエンドとバックエンド間の通信・実装ルールについて定義します。

## 1. 技術スタック (Tech Stack)

- **Framework:** Next.js (App Router) / React 19
- **Database / Auth:** Supabase (PostgreSQL, Supabase Auth)
- **ORM:** Prisma
- **Validation:** Zod
- **Server Actions:** next-safe-action

## 2. コア・アーキテクチャ思想：RPCパターンの採用

本プロジェクトでは、従来の REST API (`/api/...` エンドポイント) は原則として作成しません。
Next.js の Server Actions と `next-safe-action` を組み合わせた **RPC (Remote Procedure Call) パターン** を採用し、フロントエンドからバックエンドの関数を型安全に直接呼び出す設計としています。

### なぜ `next-safe-action` を使うのか？
生の Server Actions を直接使用した場合、入力値のバリデーションエラーの返却や、認証状態のチェックを関数ごとに手動で記述する必要があり、コードがカオス化します。
`next-safe-action` を導入することで、以下の恩恵を受けます。
- クライアント・サーバー間の**完全なエンドツーエンドの型安全**。
- Zod と連動した**自動バリデーション**と、統一されたエラーフォーマットの返却。
- ミドルウェアを用いた**認証チェックの共通化**。

## 3. Server Actions の定義ルール（クライアントの使い分け）

アクションを定義する際は、ユースケース（認証が必要かどうか）に応じて、`src/lib/safe-action.ts` で定義された2つのクライアントを厳密に使い分けます。

### ① `actionClient` (パブリックアクション)
誰でも実行可能なアクションです。サインアップや、非ログインユーザーでも閲覧できるデータの取得などに使用します。

```typescript
import { actionClient } from "@/lib/safe-action";

export const signUpAction = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }) => {
    // 認証不要の処理
  });
```

### ② `authActionClient` (認証必須アクション)
ログインしているユーザーのみが実行可能なアクションです。
内部（ミドルウェア）で Supabase Auth のセッション検証を行い、**絶対に偽装できない `ctx.userId`** を注入します。データの作成・更新・削除には必ずこちらを使用してください。


```typescript
import { authActionClient } from "@/lib/safe-action";

export const createPostAction = authActionClient
  .inputSchema(postSchema)
  .action(async ({ parsedInput, ctx }) => {
    // ctx.userId を使用して、確実に本人のデータとして処理する
    await prisma.post.create({
      data: {
        content: parsedInput.content,
        userId: ctx.userId, 
      }
    });
  });
```

## 4. バリデーション戦略

クライアントからの入力値検証は、すべて **Zod** に一任します。
- `inputSchema` に Zod スキーマを渡すだけで、実行前にサーバー側で自動的にバリデーションが行われます。
- フロントエンド側では、`result.validationErrors` を参照することで、型推論の効いた状態でエラーメッセージをUIに表示できます。

## 5. ディレクトリと責務の分離

処理の肥大化を防ぐため、以下のように責務を分離して実装します。

- **`src/app/actions/`**:
  - ルーターの役割を果たします。
  - Zod スキーマの適用、`next-safe-action` クライアントの呼び出し、クライアントへのレスポンスフォーマットの成形のみを行います。
- **`src/services/` (必要に応じて)**:
  - 複雑なビジネスロジックや、複数の Prisma クエリを組み合わせる重い DB 操作はここに切り出します。
  - Action から Service の関数を呼び出す設計とします。
- **`src/components/`**:
  - UIの描画と、Actionの呼び出し（`useAction` や `useActionState`）を担当します。