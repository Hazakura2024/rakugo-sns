import "dotenv/config";

import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    // マイグレーション実行時はDIRECT_URLを使う
    url: process.env.DIRECT_URL,
  },
});
