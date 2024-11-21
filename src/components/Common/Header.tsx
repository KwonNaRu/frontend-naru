"use client";

import styles from "./Header.module.scss";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { signOut } from "@/store/authSlice";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    function onSignOut() {
        dispatch(signOut());
    }

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
                                <button type="button" className={styles["btn-primary"]} onClick={onSignOut}>
                                    Sign Out
                                </button>
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
