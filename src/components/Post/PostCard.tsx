// components/Post.tsx

import React, { useState } from "react";
// import CommentList from "./CommentList";
import { PostProps } from "@/types/post";
import { useAppSelector } from "@/store/hooks";
import styles from "./PostCard.module.scss";

const PostCard: React.FC<PostProps> = ({ user, title }) => {
    const [isEditing, setIsEditing] = useState(false);
    // const [editedContent, setEditedContent] = useState(content);

    const { user: userState } = useAppSelector((state) => state.auth);

    const handleEdit = () => {
        setIsEditing(true);
    };

    // const handleSave = () => {
    //     // 저장 로직 추가 (예: API 호출)
    //     setIsEditing(false);
    //     // 여기서 editedContent를 서버에 저장하는 로직을 추가
    // };

    const isEditable = userState?.username === user.username;

    return (
        <div className={styles.postCard}>
            <h2 className={styles.postCardTitle}>{title}</h2>
            <p className={styles.postCardAuthor}>
                <strong>작성자:</strong> {user.username}
            </p>
            {/* {isEditing ? (
                <div>
                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <p>{content}</p>
            )} */}
            {isEditable && !isEditing && (
                <button className={styles.editButton} onClick={handleEdit}>
                    Edit
                </button>
            )}
            {/* <h3>댓글</h3>
            <CommentList comments={comments} /> */}
        </div>
    );
};

export default PostCard;
