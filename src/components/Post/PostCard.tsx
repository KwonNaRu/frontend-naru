// components/Post.tsx

import React, { useRef } from "react";
import { PostProps } from "@/types/post";
import styles from "./PostCard.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { setPost } from "@/store/postSlice";

const PostCard: React.FC<PostProps> = ({ id, author, title, content, categoryId, comments }) => {
    const dispatch = useAppDispatch();

    const isDragging = useRef(false);
    const startX = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = false;
        startX.current = e.pageX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (Math.abs(e.pageX - startX.current) > 3) {
            isDragging.current = true;
        }
    };

    const handleEdit = () => {
        if (!isDragging.current) {
            dispatch(setPost({ id, title, author, content, categoryId, comments }));
        }
    };

    return (
        <div className={styles.postCard} onClick={handleEdit} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
            <h2 className={styles.postCardTitle}>{title}</h2>
            <p className={styles.postCardAuthor}>
                <strong>작성자:</strong> {author}
            </p>
        </div>
    );
};

export default PostCard;
