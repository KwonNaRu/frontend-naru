import { User } from '@/types'

export interface CategoryFormInputs {
    name: string;
}

export interface CategoryType {
    id: number | null;
    name: string | null;
    posts: PostProps[];
}

export interface CategoryProps {
    category: CategoryType;
}

export interface PostFormInputs {
    postId: number | null;
    title: string | null;
    content: string | null;
    category: number | null;
}


export interface PostProps {
    postId: number;
    category: number;
    author: string;
    title: string;
    content: string;
    comments: CommentProps[]; // CommentProps 타입으로 지정
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