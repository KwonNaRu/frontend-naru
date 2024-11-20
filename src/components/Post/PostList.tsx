// components/CategoryList.tsx
"use client";

import React from "react";
import Carousel from "@/components/Common/Carousel";
import PostCard from "../Post/PostCard";
import { PostProps } from "@/types/post";
import styles from "./PostList.module.scss";

const PostList: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
    return posts.length > 0 ? (
        <ul className={styles["list-container"]}>
            <Carousel
                slides={posts.map((post) => (
                    <PostCard key={post.postId} {...post} /> // Post 컴포넌트 반복 렌더링
                ))}
            />
        </ul>
    ) : null;
};

export default PostList;
