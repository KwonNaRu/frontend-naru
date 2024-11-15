// components/post.tsx

import React, { useEffect, useState } from "react";
import styles from "./PostEditor.module.scss";
import { PostFormInputs } from "@/types/post";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/validationSchemas";
import axios from "@/configs/axiosConfig";
import Alert from "../Alert/Alert";
// import { useAppSelector } from "@/store/hooks";

interface PostFormType {
    postFormInputs: PostFormInputs;
    author: string;
    onClose: () => void;
}

const PostEditor: React.FC<PostFormType> = ({ author, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PostFormInputs>({
        resolver: yupResolver(postSchema),
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    // const { user } = useAppSelector((state) => state.auth);

    // const handleSave = () => {
    //     // 저장 로직 추가 (예: API 호출)
    //     setIsEditing(false);
    //     // 여기서 editedContent를 서버에 저장하는 로직을 추가
    // };

    const onSubmit = async (data: PostFormInputs) => {
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
            postId: null,
            title: "",
            content: "",
            category: null,
        });
    }, [onClose, reset]);

    return (
        <>
            {showError && errorMessage && <Alert message={errorMessage} type="error" onClose={() => setShowError(false)} />}
            <form onSubmit={handleSubmit(onSubmit)} className={styles["post-edit__form"]}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" {...register("title")} className={styles["post__input"]} />
                </div>
                {errors.title && <p className={styles["error-message"]}>{errors.title.message}</p>}
                <div>
                    <label htmlFor="category">카테고리</label>
                    <input type="text" id="category" {...register("category")} className={styles["post__input"]} />
                </div>
                {errors.category && <p className={styles["error-message"]}>{errors.category.message}</p>}
                <div>
                    <label htmlFor="author">작성자</label>
                    <div id="author" className={styles["post-author"]}>
                        {author}
                    </div>
                </div>
                <hr />
                <label htmlFor="author" className="sr-only">
                    내용
                </label>
                <textarea id="content" {...register("content")} className={styles["post__textarea"]} />
                {errors.content && <p className={styles["error-message"]}>{errors.content.message}</p>}
                <button type="submit">생성하기</button>
            </form>
        </>
    );
};

export default PostEditor;
