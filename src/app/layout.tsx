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
    openGraph: {
        title: "Naru's Blog",
        description: "Welcome to Naru's blog where interesting posts await you.",
        url: "https://example.com", // TODO: replace with your site URL
        images: [
            {
                url: "/images/favicon.ico",
                width: 800,
                height: 600,
                alt: "Naru's Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Naru's Blog",
        description: "Interesting posts on Naru's blog",
        images: "/images/favicon.ico",
    },
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
