// components/Category.tsx

import React from "react";
import styles from "./Category.module.scss";
import { CategoryProps } from "@/types/post";
import PostCard from "../Post/PostCard";
import Carousel from "../Common/Carousel";
import { useAppSelector } from "@/store/hooks";

const Category: React.FC<CategoryProps> = ({ category }) => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <li className={styles.categoryItem}>
            <div className={styles.categoryTitleWrapper}>
                <h3>{category.name}</h3>{" "}
                {user?.role === "OWNER" ? (
                    <button type="button" className="">
                        수정하기
                    </button>
                ) : null}
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
