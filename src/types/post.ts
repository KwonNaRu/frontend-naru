import { User } from '@/types'

export interface PostProps {
    post: {
        postId: number;
        user: User;
        title: string;
        content: string;
        comments: CommentProps[]; // CommentProps 타입으로 지정
    };
}

export interface CommentProps {
    commentId: number;
    user: User;
    content: string;
    replies: CommentProps[]; // CommentProps 타입으로 지정
}

export interface CommentListProps {
    comments: CommentProps[];
}