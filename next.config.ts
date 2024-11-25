import type { NextConfig } from "next";
import path from 'path'

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
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
