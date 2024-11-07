import type { Metadata } from "next";
import "./globals.scss";
import Provider from "@/components/Provider";
import Head from "next/head";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: "Naru's blog",
    description: "Naru's blog",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" /> {/* 파비콘 설정 */}
            </Head>
            <body>
                <Provider>
                    <Header />
                    {children}
                </Provider>
            </body>
        </html>
    );
}
