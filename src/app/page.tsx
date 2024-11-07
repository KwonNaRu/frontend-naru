import Logo from "@/components/Logo";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles["landing-container"]}>
            <header className={styles["landing-header"]}>
                <Logo width={250} height={250} />
                <h1>Welcome to Naru&apos;s blog</h1>
                <div className={styles["landing-header-btn-wrapper"]}>
                    <Link href="/signup" className={styles["btn-primary"]}>
                        Sign Up
                    </Link>
                    <Link href="/signin" className={styles["btn-secondary"]}>
                        Sign In
                    </Link>
                </div>
            </header>
            <section className={styles["landing-features"]}>
                <div className={styles["feature"]}>
                    <h2>Feature 1</h2>
                    <p>Discover amazing features that will enhance your experience.</p>
                </div>
                <div className={styles["feature"]}>
                    <h2>Feature 2</h2>
                    <p>Seamless integration with your favorite tools and services.</p>
                </div>
                <div className={styles["feature"]}>
                    <h2>Feature 3</h2>
                    <p>High performance and reliability with top-notch security.</p>
                </div>
            </section>
            <footer className={styles["landing-footer"]}>
                <p>&copy; 2024 Our Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}
