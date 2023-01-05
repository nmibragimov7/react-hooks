import React, {useRef, useState} from 'react';
import axios from "axios";

import useScroll from "../hooks/useScroll";

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
            <div ref={parent} className={"max-h-[80vh] overflow-x-auto shadow-gray-100 p-4 mb-10"}>
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
                <div className={"max-w-3xl mx-auto"}>
                    <code>
                        <span className={"font-bold text-orange"}>export default function</span> <span className={"font-bold text-primary-blue"}>useScroll</span>(parent, child, cb) [
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>const</span> observer = <span className={"font-bold text-primary-blue"}>useRef</span>();
                        <br/>
                        <div className={"ml-4"}>
                            <span className={"font-bold text-primary-blue"}>useEffect</span>(() => [
                            <br/>
                            <span className={"ml-4 font-bold text-orange"}>const</span> options = [
                            <br/>
                            <span className={"ml-8"}>root: parent.current,</span>
                            <br/>
                            <span className={"ml-8"}> rootMargin: '0px',</span>
                            <br/>
                            <span className={"ml-8"}>threshold: 0</span>
                            <br/>
                            <span className={"ml-4"}>]</span>
                            <br/>
                            <span className={"ml-4"}>observer.current = <span className={"font-bold text-orange"}>new</span> IntersectionObserver(([target]) => [</span>
                            <br/>
                            <span className={"ml-8"}><span className={"font-bold text-orange"}>if</span>(target.isIntersecting) [</span>
                            <br/>
                            <span className={"ml-12"}>cb();</span>
                            <br/>
                            <span className={"ml-8"}>]</span>
                            <br/>
                            <span className={"ml-4"}>], options);</span>
                            <br/>
                            <span className={"ml-4 font-bold text-orange"}>const</span> childRef = child.current;
                            <br/>
                            <span className={"ml-4"}>observer.current.observe(childRef);</span>
                            <br/>
                            <span className={"ml-4 font-bold text-orange"}>return</span> () => [
                            <br/>
                            <span className={"ml-8"}>observer.current.unobserve(childRef);</span>
                            <br/>
                            <span className={"ml-4"}>]</span>
                            <br/>
                            ], [cb, parent, child]);
                        </div>
                        ];
                    </code>
                </div>
            }
        </>
    );
};

export default List;
