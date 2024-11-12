// components/CategoryList.tsx

import React from "react";
import styles from "@/styles/components/Category.module.scss";
import Category from "./Category";
import { CategoryType } from "@/types/post";

const CategoryList: React.FC = () => {
    const categories: CategoryType[] = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Health" },
        { id: 3, name: "Travel" },
    ];

    return (
        <ul className={styles.carousel}>
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </ul>
    );
};

export default CategoryList;
