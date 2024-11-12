// components/CommentList.tsx

import React from "react";
import Comment from "./Comment";
import { CommentListProps } from "@/types/post";

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div>
            {comments.map((comment) => (
                <Comment key={comment.commentId} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
