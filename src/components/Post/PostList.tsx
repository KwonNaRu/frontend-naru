// components/CategoryList.tsx
"use client";

import React, { useEffect } from "react";
import Carousel from "@/components/Common/Carousel";
import PostCard from "../Post/PostCard";
import { PostProps } from "@/types/post";
import styles from "./PostList.module.scss";
import axiosInstance from "@/configs/axiosConfig";

const PostList: React.FC = () => {
    const [posts, setPosts] = React.useState<PostProps[]>([]);

    useEffect(() => {
        axiosInstance.get("/posts").then((response) => {
            setPosts(response.data);
        });
    }, []);

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
