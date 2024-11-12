import type { Metadata } from "next";
import "./globals.scss";
import Provider from "@/components/Common/Provider";
import localFont from "next/font/local";

const bmjua = localFont({
    src: "./fonts/BMJUA_ttf.ttf", // 폰트 파일의 경로
    variable: "--font-bm",
});

export const metadata: Metadata = {
    title: "Naru's blog",
    description: "Naru's blog",
    icons: [
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/images/favicon.ico",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={bmjua.variable}>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
