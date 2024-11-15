// components/CategoryList.tsx
"use client";

import React from "react";
import Carousel from "@/components/Common/Carousel";
import PostCard from "../Post/PostCard";
import { PostProps } from "@/types/post";
import styles from "./PostList.module.scss";

const PostList: React.FC = () => {
    const posts: PostProps[] = [
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
        { postId: 1, author: "User 1", title: "Tech Post 1", content: "Content of tech post 1", comments: [] },
    ];

    return (
        <ul className={styles["list-container"]}>
            <Carousel
                slides={posts.map((post) => (
                    <PostCard key={post.postId} {...post} /> // Post 컴포넌트 반복 렌더링
                ))}
            />
        </ul>
    );
};

export default PostList;
