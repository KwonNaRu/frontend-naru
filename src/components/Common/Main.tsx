"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import Modal from "@/components/Common/Modal";
import PostEditor from "@/components/Post/PostEditor";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CategoryList from "@/components/Category/CategoryList";
import PostList from "@/components/Post/PostList";
import axiosInstance from "@/configs/axiosConfig";
import { setPost, setPostList } from "@/store/postSlice";
import CategoryEditor from "../Category/CategoryEditor";

const Main: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const [modalComponent, setModalComponent] = useState<React.ReactNode>(null);

    const dispatch = useAppDispatch();

    const { post } = useAppSelector((state) => state.post);

    useEffect(() => {
        if (post) {
            handlePostOpenModal();
        }
    }, [post]);

    const handleCategoryOpenModal = () => {
        setModalComponent(<CategoryEditor onClose={handleCloseModal} />);
    };

    const createPost = async () => {
        try {
            const response = await axiosInstance.post("/posts");
            const { id, username, title, content, categoryId, comments } = response.data;
            dispatch(setPost({ id, author: username, title, content, categoryId, comments }));

            handlePostOpenModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostOpenModal = () => {
        setModalComponent(<PostEditor />);
    };

    const handleCloseModal = () => {
        setModalComponent(null);
    };

    const { postList } = useAppSelector((state) => state.post);
    useEffect(() => {
        axiosInstance.get("/posts").then((response) => {
            dispatch(setPostList(response.data));
        });
    }, []);

    return (
        <main className={styles["landing-main"]}>
            <Modal onClose={handleCloseModal}>{modalComponent}</Modal>

            {user?.role.includes("OWNER") ? (
                <div className={styles["main-btn-container"]}>
                    <button type="button" onClick={() => handleCategoryOpenModal()} className={styles["category-add-btn"]}>
                        카테고리 추가
                    </button>
                    <button type="button" onClick={() => createPost()} className={styles["post-add-btn"]}>
                        게시글 생성
                    </button>
                </div>
            ) : null}

            <PostList postList={postList} />

            <CategoryList />
        </main>
    );
};

export default Main;
