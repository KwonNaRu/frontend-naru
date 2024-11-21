import { PostProps } from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    postList: [] as PostProps[],
    post: null as PostProps | null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPostList: (
            state,
            action: PayloadAction<PostProps[]>
        ) => {
            state.postList = action.payload
        },
        setPost: (state, action: PayloadAction<PostProps>) => {
            state.post = action.payload
        }
    },
})

export const { setPostList, setPost } = postSlice.actions

export default postSlice.reducer
