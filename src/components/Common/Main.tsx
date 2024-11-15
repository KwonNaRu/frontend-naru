// components/CategoryList.tsx
"use client";

import React, { useState } from "react";
import styles from "./Main.module.scss";
import { PostFormInputs } from "@/types/post";
import Modal from "../Common/Modal";
import CategoryEditor from "@/components/Category/CategoryEditor";
import PostEditor from "../Post/PostEditor";
import { useAppSelector } from "@/store/hooks";
import axios from "@/configs/axiosConfig";
import CategoryList from "@/components/Category/CategoryList";
import PostList from "../Post/PostList";

const Main: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);

    const [post, setPost] = useState<PostFormInputs>({
        postId: null,
        title: "",
        content: "",
        category: null,
    });
    const [author, setAuthor] = useState("");

    const handleCategoryOpenModal = () => {
        setCategoryModalOpen(true);
    };

    const handleCategoryCloseModal = () => {
        setCategoryModalOpen(false);
    };

    const createPost = async () => {
        try {
            const response = await axios.post("/posts");
            const { postId, username, title, content, category } = response.data;
            setPost({ postId, title, content, category });
            setAuthor(username);

            handlePostOpenModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostOpenModal = () => {
        setPostModalOpen(true);
    };

    const handlePostCloseModal = () => {
        setPostModalOpen(false);
    };

    return (
        <main className={styles["landing-main"]}>
            <Modal isOpen={isCategoryModalOpen} onClose={handleCategoryCloseModal} Component={CategoryEditor} componentProps={{ categoryFormInputs: { name: "" }, onClose: () => setCategoryModalOpen(false) }} />
            <Modal isOpen={isPostModalOpen} onClose={handlePostCloseModal} Component={PostEditor} componentProps={{ postFormInputs: post, author, onClose: () => setPostModalOpen(false) }} />

            {user?.role === "OWNER" ? (
                <div className={styles["main-btn-container"]}>
                    <button type="button" onClick={() => handleCategoryOpenModal()} className={styles["category-add-btn"]}>
                        카테고리 추가
                    </button>
                    <button type="button" onClick={() => createPost()} className={styles["post-add-btn"]}>
                        게시글 생성
                    </button>
                </div>
            ) : null}

            <PostList />

            <CategoryList />
        </main>
    );
};

export default Main;