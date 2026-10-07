# rakugo-SNS Web Application

Next.js (App Router / React 19)、Supabase、Prisma を採用した、x-clone的snsです。個性付けとして落語要素を盛り込む予定です。

---

## 🛠️ 技術スタック (Tech Stack)

| レイヤー            | 技術                                 |
| :------------------ | :----------------------------------- |
| **Framework**       | Next.js (App Router) / React 19      |
| **Language**        | TypeScript                           |
| **Database & Auth** | Supabase (PostgreSQL, Supabase Auth) |
| **ORM**             | Prisma                               |
| **Validation**      | Zod                                  |
| **Server Actions**  | next-safe-action                     |
| **Styling**         | Tailwind CSS                         |

---

## 🚀 クイックスタート (Local Development)

### 1. リポジトリのクローンと依存パッケージのインストール

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、必要なキーを設定します。

```bash
cp .env.example .env.local
```

`.env.local` に記載する主な項目:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Database (Prisma)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres"
```

### 3. データベースのセットアップ

Prisma Client を生成し、データベースのスキーマを同期します。

```bash
npx prisma generate
npx prisma db push
```

> **⚠️ 注意:**  
> 本プロジェクトは Supabase Auth と `public."User"` の自動同期に **SQL トリガー** を使用しています。新規環境構築時は、必ず `docs/02-database.md` に記載されているトリガー関数を Supabase の SQL エディタで実行してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作を確認します。

---

## 📚 ドキュメント一覧 (Architecture Documentation)

詳細な設計思想、フロー、コーディング規約は `docs/` ディレクトリに整理されています。

- **[01-architecture.md](./docs/01-architecture.md)**: 全体設計、RPC パターン (`next-safe-action`)、クライアントの使い分け規約
- **[02-database.md](./docs/02-database.md)**: Prisma スキーマ、`username` / `name` の分離設計、Supabase SQL トリガー仕様
- **[03-auth-flow.md](./docs/03-auth-flow.md)**: 認証・オンボーディングの画面遷移およびシーケンス仕様
- **[04-frontend.md](./docs/04-frontend.md)**: React 19 / `next-safe-action` フック選定規約、二重送信防止、Optimistic UI

---

## 📁 ディレクトリ構成の概要

```text
├── docs/                 # 各種設計・仕様ドキュメント
├── prisma/
│   └── schema.prisma     # データベーススキーマ定義
├── src/
│   ├── app/              # Next.js App Router (ページ・ルーティング)
│   │   ├── actions/      # Server Actions (next-safe-action)
│   │   ├── (auth)/       # 認証関連ページ (signup, login)
│   │   └── onboarding/   # 初回セットアップ画面
│   ├── components/       # UI コンポーネント
│   └── lib/              # 共通ユーティリティ (Supabase, Prisma, safe-action)
└── README.md
```
