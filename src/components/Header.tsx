"use client";

import styles from "@/styles/components/Header.module.scss";
import Link from "next/link";
import { useAppSelector } from "./../store/hooks";

const Header: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Naru&apos;s blog</Link>
            </div>
            <nav className={styles.nav}>
                <ul>
                    {isAuthenticated ? (
                        <>
                            <li>{user?.username}</li>
                            <li>
                                <button className={styles["btn-primary"]}>Sign Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/signup" className={styles["btn-primary"]}>
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/signin" className={styles["btn-secondary"]}>
                                    Sign In
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
