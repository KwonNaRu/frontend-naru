import type { NextConfig } from "next";
import path from 'path'

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // GitHub Pages에서 사용하는 리포지토리 이름을 지정
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  webpack: (config) => {
    // Webpack 설정 커스터마이징 부분
    // config.module.rules.push({
    //   test: /\.svg$/, // 예시: SVG 파일을 로드하는 설정 추가
    //   use: ['@svgr/webpack'],
    // });


    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, 'src'),
    };

    return config;
  },
};

export default nextConfig;
