// components/Category.tsx

import React from "react";
import styles from "./Category.module.scss";
import { CategoryProps } from "@/types/post";
import PostCard from "../Post/PostCard";
import Carousel from "../Common/Carousel";

const Category: React.FC<CategoryProps> = ({ category }) => {
    return (
        <li className={styles.categoryItem}>
            <div className={styles.categoryTitleWrapper}>
                <h3>{category.name}</h3>{" "}
                <button type="button" className="">
                    수정하기
                </button>
            </div>
            <ul>
                <Carousel
                    slides={category.posts.map((post) => (
                        <PostCard key={post.postId} {...post} /> // Post 컴포넌트 반복 렌더링
                    ))}
                />
            </ul>
        </li>
    );
};

export default Category;
