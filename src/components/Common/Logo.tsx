import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/components/Logo.module.scss";

export default function Logo({
    width,
    height,
}: Readonly<{
    width: number;
    height: number;
}>) {
    return (
        <Link href="/" className={styles.logo}>
            <Image src="/logo.webp" alt="logo" width={width} height={height} />
        </Link>
    );
}
