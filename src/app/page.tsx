import Logo from "@/components/Common/Logo";
import styles from "./page.module.scss";
import Header from "@/components/Common/Header";
import Main from "@/components/Common/Main";

export default function Home() {
    return (
        <div className={styles["landing-container"]}>
            <Header />
            <section className={styles["landing-introduction"]}>
                <Logo width={200} height={200} loading="eager" />
                <h1>Welcome to Naru&apos;s blog</h1>
            </section>
            <Main />
            <footer className={styles["landing-footer"]}>
                <p>&copy; 2024 Our Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}
