// components/Comment.tsx

import React from "react";
import CommentList from "./CommentList";
import { User } from "@/types";

interface CommentProps {
    comment: {
        commentId: number;
        user: User;
        content: string;
        replies: CommentProps["comment"][]; // Comment 타입으로 지정
    };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div style={{ marginLeft: "20px", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>
                <strong>{comment.user.username}</strong>: {comment.content}
            </p>
            {comment.replies && comment.replies.length > 0 && <CommentList comments={comment.replies} />}
        </div>
    );
};

export default Comment;
