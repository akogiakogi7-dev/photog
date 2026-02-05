import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

const shippori = Shippori_Mincho({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-shippori",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Aru Photography | Leica",
    description: "パーソナルフォトポートフォリオ - ライカで捉える瞬間の美",
    keywords: ["photography", "Leica", "portfolio", "photographer", "art"],
    authors: [{ name: "Aru" }],
    openGraph: {
        title: "Aru Photography | Leica",
        description: "パーソナルフォトポートフォリオ - ライカで捉える瞬間の美",
        type: "website",
        locale: "ja_JP",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <head>
                <meta name="theme-color" content="#0D0D0D" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={`dark ${shippori.variable}`}>
                {children}
            </body>
        </html>
    );
}
