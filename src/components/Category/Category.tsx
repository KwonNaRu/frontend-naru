// components/Category.tsx

import React from "react";
import styles from "./Category.module.scss";
import { CategoryProps } from "@/types/post";
import { useAppSelector } from "@/store/hooks";
import PostList from "@/components/Post/PostList";

const Category: React.FC<CategoryProps> = (category) => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <li className={styles.categoryItem}>
            <div className={styles.categoryTitleWrapper}>
                <span className={styles.categoryTitle}>{category.name}</span>{" "}
                {user?.role === "OWNER" ? (
                    <button type="button" className="">
                        수정하기
                    </button>
                ) : null}
            </div>
            <PostList postList={category.posts} />
        </li>
    );
};

export default Category;
