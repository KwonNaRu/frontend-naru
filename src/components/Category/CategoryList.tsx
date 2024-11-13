// components/CategoryList.tsx
"use client";
import React, { useState } from "react";
import styles from "./Category.module.scss";
import Category from "./Category";
import { CategoryType } from "@/types/post";
import Modal from "../Common/Modal";
import CategoryEditor from "./CategoryEditor";

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

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} Component={CategoryEditor} componentProps={{ categoryFormInputs: { title: "" }, onClose: () => setModalOpen(false) }} />
            <button type="button" onClick={() => handleOpenModal()} className={styles["add-btn"]}>
                카테고리 추가
            </button>

            <ul className={styles["category-list"]}>
                {categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </ul>
        </>
    );
};

export default CategoryList;
