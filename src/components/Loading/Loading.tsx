import React from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.dogIcon}>🐶</div>
            <p className={styles.loadingText}>Fetching Naru&apos;s content...</p>
        </div>
    );
};

export default Loading;
