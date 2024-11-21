import { User } from '@/types'

export interface CategoryFormInputs {
    name: string;
}

export interface CategoryProps {
    id: number | null;
    name: string | null;
    posts: PostProps[];
}

export interface PostFormInputs {
    id: number | null;
    title: string | null;
    content: string | null;
    categoryId: number | null;
}


export interface PostProps {
    id: number;
    categoryId: number;
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