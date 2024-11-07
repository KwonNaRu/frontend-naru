import { useEffect, useState } from "react";
import styles from "@/styles/components/Alert.module.scss";

interface AlertProps {
    message: string;
    type?: "error" | "success" | "warning" | "info";
    onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = "error", onClose }) => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isHovered) {
            timer = setTimeout(() => {
                onClose?.();
            }, 5000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isHovered, onClose]);

    return (
        <div className={`${styles["alert-message"]} ${styles[type]}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {message}
        </div>
    );
};

export default Alert;
