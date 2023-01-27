import React, {useRef, useState} from 'react';
import axios from "axios";
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import useScroll from "../hooks/useScroll";
import {useScrollCode} from "../core/consts";

const List = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [shown, setShown] = useState(false);
    const parent = useRef();
    const child = useRef();
    useScroll(parent, child, () => fetchData(page));

    async function fetchData(page) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=20&_page=${page}`);
            if(response.data.length) {
                setItems(prev => [...prev, ...response.data]);
                setPage(prev => prev + 1);
            }
            setError(null);
        } catch (e) {
            setItems([]);
            setPage(1);
            setError(e.message);
        }
    }

    if(error) {
        return <div className={"text-center text-3xl text-red"}>{error}</div>;
    }

    return (
        <>
            <div ref={parent} className={"max-h-[50vh] overflow-x-auto shadow-gray-100 p-4 mb-10"}>
                {
                    items.map((item) => (
                        <div key={item.id} className={"bg-blue shadow-gray-100 text-primary-blue p-4 mb-2"}>
                            {item.id}. {item.title}
                        </div>
                    ))
                }
                <div ref={child} className={"h-[20px] w-full bg-inherit"}/>
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useScroll</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useScrollCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default List;
