// components/Post.tsx

import React, { useMemo } from "react";
import { PostProps } from "@/types/post";
import { useAppSelector } from "@/store/hooks";
import styles from "./PostCard.module.scss";
import { useMessage } from "../Common/ContextAPI";

const PostCard: React.FC<PostProps> = ({ postId, author, title, content }) => {
    const { user } = useAppSelector((state) => state.auth);

    const { setMessage } = useMessage();

    const handleEdit = () => {
        setMessage({
            postId,
            title,
            author,
            content,
        });
    };

    const isEditable = useMemo(() => user?.username === author, [user, author]);

    return (
        <div className={styles.postCard} onClick={isEditable ? () => handleEdit() : undefined}>
            <h2 className={styles.postCardTitle}>{title}</h2>
            <p className={styles.postCardAuthor}>
                <strong>작성자:</strong> {author}
            </p>
        </div>
    );
};

export default PostCard;
