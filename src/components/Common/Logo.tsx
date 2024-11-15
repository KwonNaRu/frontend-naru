import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Logo.module.scss";

export default function Logo({
    width,
    height,
    loading = "eager",
}: Readonly<{
    width: number;
    height: number;
    loading: "eager" | "lazy";
}>) {
    return (
        <Link href="/" className={styles.logo}>
            <Image src="/logo.webp" alt="logo" width={width} height={height} loading={loading} />
        </Link>
    );
}
