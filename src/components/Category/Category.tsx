// components/Category.tsx

import React from "react";
import styles from "@/styles/components/Category.module.scss";
import { CategoryProps } from "@/types/post";

const Category: React.FC<CategoryProps> = ({ category }) => {
    return (
        <li className={styles.categoryItem}>
            <h3>{category.name}</h3>
            {/* 여기에 카테고리에 대한 추가 정보를 표시할 수 있습니다. */}
        </li>
    );
};

export default Category;
