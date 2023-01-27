import React, {useState} from 'react';
import axios from "axios";
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import BaseInput from "../components/base/BaseInput/BaseInput";
import useDebounce from "../hooks/useDebounce";
import {useDebounceCode} from "../core/consts";

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
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useDebounceCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default Search;
