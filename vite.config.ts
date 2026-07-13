import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // 데브 서버 포트를 환경변수로 지정할 수 있게 한다 (기본 5173)
    port: Number(process.env.PORT) || 5173,
  },
});
