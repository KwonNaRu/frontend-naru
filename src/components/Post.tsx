// components/Post.tsx

import React, { useState } from "react";
import CommentList from "./CommentList";
import { PostProps } from "@/types/post";
import { useAppSelector } from "@/store/hooks";

const Post: React.FC<PostProps> = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);

    const { user } = useAppSelector((state) => state.auth);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // 저장 로직 추가 (예: API 호출)
        setIsEditing(false);
        // 여기서 editedContent를 서버에 저장하는 로직을 추가
    };

    const isEditable = user?.username === post.user.username;

    return (
        <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
            <h2>{post.title}</h2>
            <p>
                <strong>작성자:</strong> {post.user.username}
            </p>
            {isEditing ? (
                <div>
                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <p>{post.content}</p>
            )}
            {isEditable && !isEditing && <button onClick={handleEdit}>Edit</button>}
            <h3>댓글</h3>
            <CommentList comments={post.comments} />
        </div>
    );
};

export default Post;
