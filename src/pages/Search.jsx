import React, {useState} from 'react';
import axios from "axios";

import BaseInput from "../components/base/BaseInput/BaseInput";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
    const [value, setValue] = useState("");
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [shown, setShown] = useState(false);
    const debouncedCallback = useDebounce(searchData, 1000);
    async function searchData(query) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_query=${query}`);
            if(response.data.length) {
                setItems(response.data);
            }
            setError(null);
        } catch (e) {
            setItems([]);
            setError(e.message);
        }
    }
    const onChange = async (e) => {
        setValue(e.target.value);
        debouncedCallback(e.target.value);
    }

    if(error) {
        return <div className={"text-center text-3xl text-red"}>{error}</div>;
    }

    return (
        <>
            <div className={"max-w-md mx-auto mb-10"}>
                <p className={"text-center text-gray-500 text-4xl mb-4"}>Поиск</p>
                <BaseInput
                    name={"search"}
                    value={value}
                    onChange={onChange}
                    placeholder={"type here..."}
                />
            </div>
            <div className={"max-h-[50vh] overflow-x-auto shadow-gray-100 p-4 mb-10"}>
                {
                    items.map((item) => (
                        <div key={item.id} className={"bg-blue shadow-gray-100 text-primary-blue p-4 mb-2"}>
                            {item.id}. {item.title}
                        </div>
                    ))
                }
                {!items.length && <div className={"text-center text-gray-500"}>Записей нет</div>}
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useDebounce</span>
            </p>
            {shown &&
            <div className={"max-w-3xl mx-auto"}>
                <code>
                    <span className={"font-bold text-orange"}>export default function</span> <span className={"font-bold text-primary-blue"}>useDebounce</span>(cb, delay) [
                    <br/>
                    <span className={"ml-4 font-bold text-orange"}>const</span> timer = <span className={"font-bold text-primary-blue"}>useRef</span>();
                    <br/>
                    <div className={"ml-4"}>
                        <span className={"font-bold text-orange"}>const</span> debouncedCallback = <span className={"font-bold text-primary-blue"}>useCallback</span>((...args) => [
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>if</span> (timer.current) [
                        <br/>
                        <span className={"ml-8"}><span className={"font-bold text-primary-blue"}>clearTimeout</span>(timer.current);</span>
                        <br/>
                        <span className={"ml-4"}>]</span>
                        <br/>
                        <span className={"ml-4"}>timer.current = <span className={"font-bold text-primary-blue"}>setTimeout</span>(<span className={"font-bold text-orange"}>async</span> () => [</span>
                        <br/>
                        <span className={"ml-8 font-bold text-orange"}>await</span> cb(...args);
                        <br/>
                        <span className={"ml-4"}>], delay);</span>
                        <br/>
                        <span>], [timer, cb, delay]);</span>
                    </div>
                    <br/>
                    <span className={"ml-4 font-bold text-orange"}>return</span> debouncedCallback;
                    <br/>
                    ];
                </code>
            </div>
            }
        </>
    );
};

export default Search;
