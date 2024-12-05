import React from "react";
import styles from "./Modal.module.scss"; // 스타일을 위한 CSS 파일

// ModalProps 타입 정의
interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    return children !== null ? (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-content"]}>
                <button className={styles["close-button"]} onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    ) : null;
};

export default Modal;
