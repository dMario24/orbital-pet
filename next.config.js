/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        //pathname: '/user-attachments/assets/**', // 필요한 경우 특정 경로를 지정
      },
      {
        protocol: 'https',
        hostname: 'letswift.kr',
        //pathname: '/user-attachments/assets/**', // 필요한 경우 특정 경로를 지정
      },
      {
        protocol: 'https',
        hostname: 'dotnetdev.kr',
      },

      // 다른 이미지 호스트가 있다면 여기에 추가
    ],
  },
};

module.exports = nextConfig;