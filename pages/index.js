import React, { useEffect, useRef, useState } from "react";
import { useInput } from "@cooksmelon/event";
import styled from "@emotion/styled";
import Axios from "axios";
import { NextSeo } from "next-seo";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    form {
        margin-top: 48px;
        input {
            all: unset;
            background-color: #ffffff;
            border: 1px solid #dbdbdb;
            padding: 6px 12px;
            font-size: 20px;
        }
        button {
            all: unset;
            background-color: #ffffff;
            cursor: pointer;
            border: 1px solid #dbdbdb;
            padding: 6px 12px;
            color: #333;
            font-size: 20px;
        }
    }
`;

const Message = styled.div`
    position: absolute;
    top: 10px;
    background: #333;
    color: #ffffff;
    opacity: 0.8;
    font-size: 12px;
    padding: 12px;
`;

const EmojiContainer = styled.div`
    display: grid;
    margin-top: 12px;
    font-size: 26px;
    gap: 12px;
    grid-template-columns: repeat(5, 1fr);
`;

const Emoji = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background-color: #ffffff;
    text-align: center;
    div {
        cursor: pointer;
        border: 1px solid #dbdbdb;
        background-color: #ffffff;
        border-radius: 12px;
        padding: 8px;
        &:hover {
            background: #dbdbdb;
        }
    }
`;

const index = () => {
    const [text, onChange] = useInput("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const emoji = useRef();

    const onSumbit = (e) => {
        e.preventDefault();
        const getEmoji = async () => {
            setLoading(true);
            try {
                await Axios.post("/search", {
                    text,
                }).then((res) => {
                    setData(res.data);
                });
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        getEmoji();
    };

    const onClick = (e) => {
        setOpen(true);
        const text = document.createElement("textarea");
        document.body.appendChild(text);
        text.value = e.target.innerText;
        text.select();
        document.execCommand("copy");
        document.body.removeChild(text);
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
    }, [open]);

    return (
        <Container>
            <NextSeo
                title="GetToEmoji! | 이모지를 쉽게 가져오세요"
                description="이모지를 검색하고 클릭해서 바로 복사 후 사용하세요!"
                canonical="https://gte.vercel.app/"
                openGraph={{
                    url: "https://gte.vercel.app/",
                    title: "GetToEmoji! | 이모지를 쉽게 가져오세요",
                    description:
                        "이모지를 검색하고 클릭해서 바로 복사 후 사용하세요!",
                    site_name: "gettoemoji",
                }}
            />
            {open && <Message>클립보드 복사</Message>}
            <form onSubmit={onSumbit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="only English"
                />
                <button type="submit">검색하기</button>
            </form>
            {loading && <div>...Loading, 첫 검색 시 느릴 수 있습니다.</div>}
            <EmojiContainer>
                {data.length > 0 &&
                    data.map((v) => (
                        <Emoji key={v.id}>
                            <div ref={emoji} onClick={onClick}>
                                {v.emoji && v.emoji}
                            </div>
                        </Emoji>
                    ))}
            </EmojiContainer>
        </Container>
    );
};

export default index;
