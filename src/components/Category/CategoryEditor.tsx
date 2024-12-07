// components/Category.tsx

import { CategoryFormInputs } from "@/types/post";
import { categorySchema } from "@/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Category.module.scss";
import { hideAlert, showAlert } from "@/store/commonSlice";
import { useAppDispatch } from "@/store/hooks";

const CategoryEditor = ({ onClose, createCategory }: { onClose: () => void; createCategory: (data: CategoryFormInputs) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormInputs>({
        resolver: yupResolver(categorySchema),
    });

    const dispatch = useAppDispatch();

    const onSubmit = async (data: CategoryFormInputs) => {
        try {
            dispatch(hideAlert());
            createCategory(data);
            onClose();
        } catch (error) {
            dispatch(showAlert({ message: "카테고리 생성에 실패했습니다. 다시 시도해 주세요.", type: "error", show: true }));
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="name" {...register("name")} className={styles["category-name__input"]} />
                {errors.name && <p className={styles["error-message"]}>{errors.name.message}</p>}
                <button type="submit">생성하기</button>
            </form>
        </>
    );
};

export default CategoryEditor;
