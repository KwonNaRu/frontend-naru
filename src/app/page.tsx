import Logo from "@/components/Common/Logo";
import styles from "./page.module.scss";
import Header from "@/components/Common/Header";
import CategoryList from "@/components/Category/CategoryList";

export default function Home() {
    return (
        <div className={styles["landing-container"]}>
            <Header />
            <section className={styles["landing-introduction"]}>
                <Logo width={250} height={250} />
                <h1>Welcome to Naru&apos;s blog</h1>
            </section>
            <main className={styles["landing-main"]}>
                <CategoryList />
            </main>
            <footer className={styles["landing-footer"]}>
                <p>&copy; 2024 Our Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}
