// components/CategoryList.tsx
"use client";

import React, { useState } from "react";
import styles from "./Category.module.scss";
import Category from "./Category";
import { CategoryType } from "@/types/post";
import Modal from "../Common/Modal";
import CategoryEditor from "./CategoryEditor";
import PostEditor from "../Post/PostEditor";
import { useAppSelector } from "@/store/hooks";

const CategoryList: React.FC = () => {
    const categories: CategoryType[] = [
        {
            id: 1,
            name: "Technology",
            posts: [
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
            ],
        },
        {
            id: 2,
            name: "Health",
            posts: [
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
            ],
        },
        {
            id: 3,
            name: "Travel",
            posts: [
                { postId: 1, user: { username: "User 1", email: "", role: "" }, title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 2, user: { username: "User 2", email: "", role: "" }, title: "Tech Post 2", content: "Content of tech post 2", comments: [] },
            ],
        },
    ];

    const { user } = useAppSelector((state) => state.auth);

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);

    const handleCategoryOpenModal = () => {
        setCategoryModalOpen(true);
    };

    const handleCategoryCloseModal = () => {
        setCategoryModalOpen(false);
    };

    const handlePostOpenModal = () => {
        setPostModalOpen(true);
    };

    const handlePostCloseModal = () => {
        setPostModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isCategoryModalOpen} onClose={handleCategoryCloseModal} Component={CategoryEditor} componentProps={{ categoryFormInputs: { name: "" }, onClose: () => setCategoryModalOpen(false) }} />
            <Modal isOpen={isPostModalOpen} onClose={handlePostCloseModal} Component={PostEditor} componentProps={{ postFormInputs: { title: "", content: "", category: 0 }, onClose: () => setPostModalOpen(false) }} />

            {user?.role === "OWNER" ? (
                <div className={styles["category-list-btn-container"]}>
                    <button type="button" onClick={() => handleCategoryOpenModal()} className={styles["category-add-btn"]}>
                        카테고리 추가
                    </button>
                    <button type="button" onClick={() => handlePostOpenModal()} className={styles["post-add-btn"]}>
                        게시글 생성
                    </button>
                </div>
            ) : null}

            <ul className={styles["category-list"]}>
                {categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </ul>
        </>
    );
};

export default CategoryList;
