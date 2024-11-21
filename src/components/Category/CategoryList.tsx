// components/CategoryList.tsx
"use client";

import React, { useEffect } from "react";
import styles from "./Category.module.scss";
import Category from "./Category";
import axiosInstance from "@/configs/axiosConfig";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategoryList } from "@/store/categorySlice";

const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryList } = useAppSelector((state) => state.category);
    useEffect(() => {
        axiosInstance.get("/categories").then((response) => {
            dispatch(setCategoryList(response.data));
        });
    }, []);

    return categoryList.length > 0 ? (
        <ul className={styles["category-list"]}>
            {categoryList.map((category) => (
                <Category key={category.id} {...category} />
            ))}
        </ul>
    ) : null;
};

export default CategoryList;
