"use client";

import CategoryList from "@/components/Category/CategoryList";
import Modal from "@/components/Common/Modal";
import PostEditor from "@/components/Post/PostEditor";
import PostList from "@/components/Post/PostList";
import axiosInstance from "@/configs/axiosConfig";
import { setCategoryList } from "@/store/categorySlice";
import { showAlert } from "@/store/commonSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPost, setPostList } from "@/store/postSlice";
import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import CategoryEditor from "../Category/CategoryEditor";
import styles from "./Main.module.scss";

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
        setModalComponent(<CategoryEditor onClose={handleCloseModal} createCategory={createCategory} />);
    };

    const createPost = async () => {
        try {
            client.current?.publish({
                destination: "/app/create/post",
            });
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
    }, [dispatch]);

    const { categoryList } = useAppSelector((state) => state.category);

    const client = useRef<Client | null>(null);

    useEffect(() => {
        try {
            // SockJS와 STOMP 클라이언트를 사용해 WebSocket 연결 설정
            client.current = new Client({
                webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`), // 인스턴스 생성 시점 변경
                reconnectDelay: 5000, // 연결 실패 시 5초 후 재시도
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            client.current.onConnect = (frame: any) => {
                console.log("Connected: " + frame);

                // /topic/posts 경로에 구독 설정
                client.current?.subscribe("/topic/create/category", (message: any) => {
                    dispatch(setCategoryList([JSON.parse(message.body), ...categoryList]));
                });

                client.current?.subscribe("/topic/create/post", (message: any) => {
                    const { id, username, title, content, categoryId, comments } = JSON.parse(message.body);
                    dispatch(setPostList([JSON.parse(message.body), ...postList]));
                    setPost({ id, author: username, title, content, categoryId, comments });
                    handlePostOpenModal();
                });
            };

            client.current!.onStompError = (frame: any) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
                dispatch(showAlert({ message: "게시글 수정에 실패했습니다. 다시 시도해 주세요.", type: "error", show: true }));
            };

            client.current?.activate(); // STOMP 클라이언트 활성화

            return () => {
                // 컴포넌트 언마운트 시 연결 해제
                client.current?.deactivate();
            };
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, categoryList]);

    function createCategory(data: any) {
        client.current?.publish({
            destination: "/app/category",
            body: JSON.stringify({ ...data }),
        });
    }

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
