import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
    postId: number;
    author: string;
    title: string | null;
    category: number | null;
    content: string | null;
}

interface PostState {
    postList: Post[];
}

const initialState: PostState = {
    postList: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPostList: (
            state,
            action: PayloadAction<PostState>
        ) => {
            state.postList = action.payload.postList
        },
    },
})

export const { getPostList } = postSlice.actions

export default postSlice.reducer
