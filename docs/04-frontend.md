# フロントエンド設計・状態管理規約 (Frontend & State Management)

本書では、Next.js (App Router) および React 19 環境におけるフォーム処理、Server Actions 呼び出し用フックの使い分け、連打防止（二重送信対策）、および楽観的 UI 更新の実装規約について定義します。

---

## 1. フック選定・使い分けマトリクス

本プロジェクトでは、用途・性質に応じて使用するフックを厳密に制限・統一します。

| フック | 提供元 | 主な用途 | 特徴・選定理由 |
| :--- | :--- | :--- | :--- |
| **`useActionState`** | React 19 標準 | サインアップ、オンボーディングなどの重いフォーム | 複数入力項目の状態（`prevState`）やエラー保持、Progressive Enhancement（JS遅延時でも送信可能）に優れる。 |
| **`useAction`** | `next-safe-action` | 単発ボタン操作（いいね、削除、単一入力の投稿作成） | `<form>` なしでも呼び出し可能。Zod バリデーション結果への強力な型推論と `isExecuting` を提供。 |
| **`useOptimistic`** | React 19 標準 | タイムラインへの即時反映、いいねカウントの即時加算 | サーバーのレスポンスを待たずに UI を書き換え、通信失敗時は自動でロールバックする。 |

> **⚠️ 原則使用しないフック:**
> - `useTransition`: React 19 の `<form action={...}>` や `useAction` が内部で自動管理するため、明示的な呼び出しは不要。
> - `useFormStatus`: 親コンポーネントで `isExecuting` や `isPending` を一括制御できるため、原則として採用しない。

---

## 2. 連打防止（二重送信対策）の必須ルール

高速連打による意図しない多重レコード生成やエラーを防ぐため、以下の2層防御を標準パターンとします。

1. **UI 層での防御:** 送信中フラグ（`isPending` / `isExecuting`）を用いた `disabled` 属性の付与。
2. **ロジック層での防御:** 非同期処理の完了待機（`executeAsync` の `await`）。

### 実装パターン: `useAction` を用いた単一フォーム
`execute` をそのまま呼ぶのではなく、ハンドラー内で `executeAsync` を `await` することで、非同期処理が完全に終了するまで後続処理をブロックします。

```tsx
"use client";

import { useAction } from "next-safe-action/hooks";
import { createPostAction } from "@/app/actions/post";

export function PostForm() {
  const { executeAsync, isExecuting } = useAction(createPostAction);

  const handleSubmit = async (formData: FormData) => {
    if (isExecuting) return; // 連打ガード

    const content = formData.get("content") as string;
    await executeAsync({ content });
  };

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        name="content"
        placeholder="いまどうしてる？"
        disabled={isExecuting}
      />
      <button type="submit" disabled={isExecuting}>
        {isExecuting ? "送信中..." : "投稿"}
      </button>
    </form>
  );
}
```

---

## 3. 重いフォーム（オンボーディング等）の実装標準

入力エラーの保持やページ全体のコンテキストが必要なフォーム画面では、`useActionState` を用いて制御します。

```tsx
"use client";

import { useActionState } from "react";
import { setupAccountAction } from "@/app/actions/onboarding";

type FormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

const initialState: FormState = {};

export function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      // Actionの実行とエラーハンドリング
      return await setupAccountAction(formData);
    },
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">ユーザーネーム</label>
        <input
          id="username"
          name="username"
          type="text"
          disabled={isPending}
          required
        />
        {state.fieldErrors?.username && (
          <p className="text-red-500">{state.fieldErrors.username[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="name">表示名</label>
        <input
          id="name"
          name="name"
          type="text"
          disabled={isPending}
          required
        />
      </div>

      {state.error && <p className="text-red-500">{state.error}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "設定中..." : "始める"}
      </button>
    </form>
  );
}
```

---

## 4. 楽観的更新 (Optimistic UI) の方針

SNS アプリケーションとしての軽快な操作感を担保するため、「いいね」「投稿」などの高頻度アクションには `useOptimistic` を適用します。

```tsx
"use client";

import { useOptimistic } from "react";
import { toggleLikeAction } from "@/app/actions/like";

type LikeButtonProps = {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
};

export function LikeButton({ postId, initialLiked, initialCount }: LikeButtonProps) {
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    { isLiked: initialLiked, count: initialCount },
    (current) => ({
      isLiked: !current.isLiked,
      count: current.isLiked ? current.count - 1 : current.count + 1,
    })
  );

  const handleLike = async () => {
    // 1. UIを先行して即時更新
    setOptimisticLike(null);
    // 2. バックエンドへ送信
    await toggleLikeAction({ postId });
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-1">
      <span>{optimisticLike.isLiked ? "❤️" : "🤍"}</span>
      <span>{optimisticLike.count}</span>
    </button>
  );
}
```

---

## 5. UI 実装時のコーディング原則

1. **命令的 DOM 操作（`useRef`）の乱用禁止:**
   - 入力値の取得や画面表示の切り替えに `ref.current.value` や `ref.current.style` を使用しない。
   - `useRef` は「アニメーション/Canvas」「外部非Reactライブラリ」「非描画フラグ/タイマーID」の管理に限定する。
2. **コンポーネントの責務分離:**
   - 画面（ページコンポーネント）は極力 Server Component として構成し、フォームやボタンなど対話性が必要なリーフ（末端）のみを `'use client'` とする。