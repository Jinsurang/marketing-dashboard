import "./globals.css";

export const metadata = {
  title: "마케팅 통합 대시보드 V2",
  description: "플랫폼별 마케팅 데이터를 분석하고 관리합니다.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
