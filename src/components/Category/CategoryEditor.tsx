// components/Category.tsx

import React, { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import { CategoryFormInputs } from "@/types/post";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "@/validationSchemas";
import axios from "@/configs/axiosConfig";
import Alert from "@/components/Alert/Alert";

interface CategoryFormType {
    categoryFormInputs: CategoryFormInputs;
    onClose: () => void;
}

const CategoryEditor: React.FC<CategoryFormType> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormInputs>({
        resolver: yupResolver(categorySchema),
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const onSubmit = async (data: CategoryFormInputs) => {
        try {
            setErrorMessage("");
            setShowError(false);
            const response = await axios.post("/categories", data);
            console.log(response.data); // 서버 응답 로그
            onClose();
        } catch (error) {
            setErrorMessage("카테고리 생성에 실패했습니다. 다시 시도해 주세요.");
            setShowError(true);
            console.error(error);
        }
    };

    useEffect(() => {
        reset({
            name: "",
        });
    }, [onClose, reset]);

    return (
        <>
            {showError && errorMessage && <Alert message={errorMessage} type="error" onClose={() => setShowError(false)} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="name" {...register("name")} className={styles["category-name__input"]} />
                {errors.name && <p className={styles["error-message"]}>{errors.name.message}</p>}
                <button type="submit">생성하기</button>
            </form>
        </>
    );
};

export default CategoryEditor;
