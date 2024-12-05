"use client";

import { useEffect, useState } from "react";
import styles from "./Alert.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideAlert } from "@/store/commonSlice";

const Alert: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useAppDispatch();
    const { alert } = useAppSelector((state) => state.common);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (alert.show && !isHovered) {
            timer = setTimeout(() => {
                dispatch(hideAlert());
            }, 5000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isHovered, alert.show]);

    return alert.show ? (
        <div className={`${styles["alert-message"]} ${styles[alert.type]}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {alert.message}
        </div>
    ) : null;
};

export default Alert;
