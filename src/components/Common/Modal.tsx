import React from "react";
import styles from "./Modal.module.scss"; // 스타일을 위한 CSS 파일

// ModalProps 타입 정의
interface ModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    Component: React.ComponentType<T>; // 렌더링할 컴포넌트 타입
    componentProps?: T; // 컴포넌트에 전달할 props
}

const Modal = <T extends object>({ isOpen, onClose, Component, componentProps }: ModalProps<T>) => {
    if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-content"]}>
                <button className={styles["close-button"]} onClick={onClose}>
                    X
                </button>
                <Component {...(componentProps || ({} as T))} />
            </div>
        </div>
    );
};

export default Modal;
