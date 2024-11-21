// components/post.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PostEditor.module.scss";
import { PostFormInputs } from "@/types/post";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/validationSchemas";
import Alert from "../Alert/Alert";
import { useAppSelector } from "@/store/hooks";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { throttle } from "lodash";
import { computedCategoryListWithoutPosts } from "@/store/categorySlice";

interface PostFormType {
    onClose: () => void;
}

const PostEditor: React.FC<PostFormType> = () => {
    const { post } = useAppSelector((state) => state.post);

    const { register, watch } = useForm({
        resolver: yupResolver(postSchema),
        defaultValues: {
            id: post?.id,
            title: post?.title,
            content: post?.content,
            categoryId: post?.categoryId,
        },
    });

    const categoriesWithoutPosts = useAppSelector(computedCategoryListWithoutPosts);

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const { user } = useAppSelector((state) => state.auth);

    const isEditable = useMemo(() => user?.role === "OWNER", [user]);

    const client = useRef<Client | null>(null);

    useEffect(() => {
        try {
            // SockJS와 STOMP 클라이언트를 사용해 WebSocket 연결 설정
            client.current = new Client({
                webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // 인스턴스 생성 시점 변경
                reconnectDelay: 5000, // 연결 실패 시 5초 후 재시도
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            client.current.connectHeaders = {
                Authorization: `Bearer ${Cookies.get("NID_AUTH")}`,
            };

            client.current.onConnect = (frame: any) => {
                console.log("Connected: " + frame);

                // /topic/posts 경로에 구독 설정
                client.current?.subscribe("/topic/posts", (message: any) => {
                    console.log("Received message: ", message.body);
                });
            };

            client.current!.onStompError = (frame: any) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
                setErrorMessage("게시글 수정에 실패했습니다. 다시 시도해 주세요.");
            };

            client.current?.activate(); // STOMP 클라이언트 활성화

            return () => {
                // 컴포넌트 언마운트 시 연결 해제
                client.current?.deactivate();
            };
        } catch (error) {
            console.error(error);
        }
    }, []);

    // 로컬스토리지 키 설정
    const STORAGE_KEY = `post_draft_${post?.id}`;

    // 쓰로틀된 publish 함수 생성
    const throttledPublish = useMemo(
        () =>
            throttle((data: PostFormInputs) => {
                try {
                    client.current?.publish({
                        destination: "/app/post",
                        body: JSON.stringify({
                            id: post?.id,
                            title: data.title,
                            content: data.content,
                            categoryId: data.categoryId,
                        }),
                    });
                    // publish 성공 시 로컬스토리지 초기화
                    localStorage.removeItem(STORAGE_KEY);
                } catch (error) {
                    console.error(error);
                    setErrorMessage("게시글 전송에 실패했습니다.");
                    setShowError(true);
                }
            }, 1000), // 1초 쓰로틀링
        [post?.id]
    );

    // 입력값 변화 감지 및 로컬스토리지 저장
    useEffect(() => {
        const subscription = watch((data) => {
            // 로컬스토리지에 저장
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            // 쓰로틀된 publish 실행
            throttledPublish(data as PostFormInputs);
        });

        return () => {
            subscription.unsubscribe();
            throttledPublish.cancel(); // 쓰로틀 취소
        };
    }, [watch, throttledPublish, STORAGE_KEY]);

    // 입력값 변화 감지
    useEffect(() => {
        const subscription = watch((data) => {
            try {
                client.current?.publish({
                    destination: "/app/post",
                    body: JSON.stringify({
                        id: post?.id,
                        title: data.title,
                        content: data.content,
                        categoryId: data.categoryId,
                    }),
                });
            } catch (error) {
                console.error(error);
                setErrorMessage("게시글 전송에 실패했습니다.");
                setShowError(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, post?.id]);

    // 컴포넌트 언마운트 시 로컬스토리지 데이터 publish
    useEffect(() => {
        return () => {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    client.current?.publish({
                        destination: "/app/post",
                        body: savedData,
                    });
                    localStorage.removeItem(STORAGE_KEY);
                } catch (error) {
                    console.error(error);
                    setErrorMessage("게시글 전송에 실패했습니다.");
                    setShowError(true);
                }
            }
            client.current?.deactivate();
        };
    }, [STORAGE_KEY]);

    return (
        <>
            {showError && errorMessage && <Alert message={errorMessage} type="error" onClose={() => setShowError(false)} />}
            <form className={styles["post-edit__form"]}>
                <div>
                    <label htmlFor="title">제목</label>
                    {isEditable ? <input type="text" id="title" {...register("title")} className={styles["post__input"]} /> : <span>{post?.title}</span>}
                </div>
                <div>
                    <label htmlFor="category">카테고리</label>
                    {isEditable ? (
                        <select id="category" {...register("categoryId")} className={styles["post__input"]}>
                            <option value="">카테고리 선택</option>
                            {categoriesWithoutPosts.map((category) => (
                                <option key={category.id} value={`${category.id}`}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span>{post?.categoryId}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="author">작성자</label>
                    <span id="author" className={styles["post-author"]}>
                        {post?.author}
                    </span>
                </div>
                <hr />
                <label htmlFor="author" className="sr-only">
                    내용
                </label>
                {isEditable ? <textarea id="content" {...register("content")} className={styles["post__textarea"]} /> : <span>{post?.content}</span>}
            </form>
        </>
    );
};

export default PostEditor;
