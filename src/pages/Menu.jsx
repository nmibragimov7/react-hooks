import React, {useRef, useState} from 'react';
import Highlight from "react-highlight";
import 'highlight.js/styles/github.css';

import {useMenu} from "../hooks/useMenu";
import {useMenuCode} from "../core/consts";

const items = [
    {
        id: "A",
        title: "A",
        color: "red"
    },
    {
        id: "B",
        title: "B",
        color: "yellow"
    },
    {
        id: "C",
        title: "C",
        color: "green"
    }
];

const Description = () => {
    const [shown, setShown] = useState(false);

    return (
        <>
            <p className={"text-center text-2xl text-birch-100 mb-4"}>
                Реализован пользовательский хук <span
                className={"text-dark hover:text-dark/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useMenu</span>
            </p>
            {shown &&
                <div className={"max-w-6xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useMenuCode}
                    </Highlight>
                </div>
            }
        </>
    );
};
const Menu = () => {
    const links = Array.from(Array(items.length), () => useRef(null));
    const blocks = Array.from(Array(items.length), () => useRef(null));
    useMenu(blocks, links);
    const onScroll = (idx) => {
        window.scrollTo({
            top: blocks[idx].current.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div className={"bg-red bg-yellow bg-green bg-birch"}/>
            <div className={"fixed top-1/2 right-0 translate-y-[-50%]"}>
                {links.map((ref, idx) => (
                    <div
                        ref={ref}
                        key={`link-${idx}`}
                        data-id={items[idx].id}
                        data-color={items[idx].color}
                        className={"w-16 h-16 flex items-center justify-center cursor-pointer border border-solid border-white"}
                        onClick={() => onScroll(idx)}
                    >
                        <div className={"text-2xl font-bold text-white"}>{items[idx].title}</div>
                    </div>
                ))}
            </div>
            {blocks.map((block, idx) =>
                <div
                    id={items[idx].title}
                    key={`block-${idx}`}
                    ref={block}
                    className={["min-h-screen shadow-gray-100 p-8", `bg-${items[idx].color}`].join(" ")}
                >
                    {!idx && <Description />}
                </div>
            )}
        </>
    );
};

export default Menu;
