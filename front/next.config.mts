import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// pnpm 워크스페이스: 저장소 루트에도 `next`가 링크되므로 Turbopack이 여기서 패키지를 찾게 한다.
const monorepoRoot = path.resolve(__dirname, "..");

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
