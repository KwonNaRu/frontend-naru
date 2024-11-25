// components/CategoryList.tsx
"use client";

import React from "react";
import Carousel from "@/components/Common/Carousel";
import PostCard from "@/components/Post/PostCard";
import { PostProps } from "@/types/post";
import styles from "./PostList.module.scss";

const PostList: React.FC<{ postList: PostProps[] }> = ({ postList }) => {
    return postList.length > 0 ? (
        <ul className={styles["list-container"]}>
            <Carousel
                slides={postList.map((post) => (
                    <PostCard key={post.id} {...post} /> // Post 컴포넌트 반복 렌더링
                ))}
            />
        </ul>
    ) : null;
};

export default PostList;
