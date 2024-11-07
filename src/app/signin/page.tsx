import React from "react";
import styles from "./signin.module.scss";
import SignInForm from "./SignInForm";

const SignIn: React.FC = () => {
    return (
        <div className={`${styles.signin} ${styles["sign-form-container"]}`}>
            <SignInForm />
        </div>
    );
};

export default SignIn;
