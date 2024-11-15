// components/CategoryList.tsx
"use client";

import React from "react";
import styles from "./Category.module.scss";
import Category from "./Category";
import { CategoryType } from "@/types/post";

const CategoryList: React.FC = () => {
    const categories: CategoryType[] = [
        {
            id: 1,
            name: "Technology",
            posts: [
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
            ],
        },
        {
            id: 2,
            name: "Health",
            posts: [
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
            ],
        },
        {
            id: 3,
            name: "Travel",
            posts: [
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
                { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
            ],
        },
    ];

    return (
        <ul className={styles["category-list"]}>
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </ul>
    );
};

export default CategoryList;
