"use client";

import React from "react";
import styles from "./PuppyLoader.module.scss";
import { useAppSelector } from "@/store/hooks";

const PuppyLoader = () => {
    const { isLoading } = useAppSelector((state) => state.common);

    return isLoading ? (
        <div className={styles.dimOverlay}>
            <div className={styles.puppyLoader}>
                <div className={styles.scene}>
                    <div className={styles.puppy}>
                        <span className={styles.dog}>🦮</span>
                        <div className={styles.shadow}></div>
                    </div>
                    <div className={styles.loadingText}>Loading...</div>
                </div>
            </div>
        </div>
    ) : null;
};

export default PuppyLoader;
