import type { Metadata } from "next";
import "./globals.scss";
import Provider from "@/components/Provider";

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
        <html lang="en">
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
