import React from "react";
import styles from "./signup.module.scss";
import SignUpForm from "./SignUpForm";

const SignUp: React.FC = () => {
    return (
        <div className={`${styles.signup} ${styles["sign-form-container"]}`}>
            <SignUpForm />
        </div>
    );
};

export default SignUp;
