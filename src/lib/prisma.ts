import { PrismaClient } from "@/generated/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7.8.0 用の最新の初期化処理
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("環境変数 DATABASE_URL が設定されていません。");
  }

  // pgモジュールのコネクションプールを作成
  const pool = new Pool({ connectionString });

  // Prismaにpgアダプターをセットアップ
  const adapter = new PrismaPg(pool);

  // 🌟 アダプターを渡してPrismaClientを初期化（これが必須になりました）
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
