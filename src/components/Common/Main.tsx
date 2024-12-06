"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import Modal from "@/components/Common/Modal";
import PostEditor from "@/components/Post/PostEditor";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CategoryList from "@/components/Category/CategoryList";
import PostList from "@/components/Post/PostList";
import axiosInstance from "@/configs/axiosConfig";
import { setPost, setPostList } from "@/store/postSlice";
import CategoryEditor from "../Category/CategoryEditor";

const Main: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const [modalComponent, setModalComponent] = useState<React.ReactNode>(null);

    const dispatch = useAppDispatch();

    const { post } = useAppSelector((state) => state.post);

    useEffect(() => {
        if (post) {
            handlePostOpenModal();
        }
    }, [post]);

    const handleCategoryOpenModal = () => {
        setModalComponent(<CategoryEditor onClose={handleCloseModal} />);
    };

    const createPost = async () => {
        try {
            const response = await axiosInstance.post("/posts");
            const { id, username, title, content, categoryId, comments } = response.data;
            dispatch(setPost({ id, author: username, title, content, categoryId, comments }));

            handlePostOpenModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostOpenModal = () => {
        setModalComponent(<PostEditor />);
    };

    const handleCloseModal = () => {
        setModalComponent(null);
    };

    const { postList } = useAppSelector((state) => state.post);
    useEffect(() => {
        axiosInstance.get("/posts").then((response) => {
            dispatch(setPostList(response.data));
        });
    }, []);

    const [subscriptionData, setSubscriptionData] = useState(null);

    useEffect(() => {
        // WebSocket 초기화
        const ws = new WebSocket("ws://localhost:8080/subscriptions");

        ws.onopen = () => {
            console.log("WebSocket connected");

            // 구독 시작 메시지 보내기
            ws.send(
                JSON.stringify({
                    type: "start",
                    id: "1",
                    payload: {
                        query: `
                            subscription {
                                postCreated {
                                    id
                                    title
                                    content
                                    category {
                                        id
                                        name
                                    }
                                }
                            }
                        `,
                    },
                })
            );
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Received message:", message);

            if (message.type === "data" && message.payload) {
                setSubscriptionData(message.payload.data.postCreated);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // WebSocket 종료 처리
        return () => ws.close();
    }, []);

    return (
        <main className={styles["landing-main"]}>
            <Modal onClose={handleCloseModal}>{modalComponent}</Modal>

            {user?.role.includes("OWNER") ? (
                <div className={styles["main-btn-container"]}>
                    <button type="button" onClick={() => handleCategoryOpenModal()} className={styles["category-add-btn"]}>
                        카테고리 추가
                    </button>
                    <button type="button" onClick={() => createPost()} className={styles["post-add-btn"]}>
                        게시글 생성
                    </button>
                </div>
            ) : null}

            <PostList postList={postList} />

            <CategoryList />
        </main>
    );
};

export default Main;
