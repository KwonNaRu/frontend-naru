// components/CategoryList.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import Category from "./Category";
import { CategoryType } from "@/types/post";
import axiosInstance from "@/configs/axiosConfig";

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    useEffect(() => {
        axiosInstance.get("/categories").then((response) => {
            setCategories(response.data);
        });
    }, []);

    return categories.length > 0 ? (
        <ul className={styles["category-list"]}>
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </ul>
    ) : null;
};

export default CategoryList;
