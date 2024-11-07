import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/components/Logo.module.scss";

export default function Logo() {
    return (
        <Link href="/" className={styles.logo}>
            <Image src="/logo.webp" alt="logo" width={250} height={250} />
        </Link>
    );
}
