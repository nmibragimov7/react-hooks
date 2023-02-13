import React, {useCallback, useRef, useState} from 'react';
import Highlight from "react-highlight";
import 'highlight.js/styles/github.css';

import BaseInput from "../components/base/BaseInput/BaseInput";
import useInput from "../hooks/useInput";
import {useMutationObserver} from "../hooks/useMutationObserver";
import {useMutationObserverCode} from "../core/consts";

const MutationObserverPage = () => {
    const {value, onChange} = useInput("");
    const [error, setError] = useState(false);
    const [shown, setShown] = useState(false);
    const ref = useRef(null);
    const cb = useCallback((mutation) => {
        if(!mutation.target.value) {
            setError(false);
            return;
        }
        setError(!new RegExp(/[0-9]/).test(mutation.target.value));
    }, []);
    useMutationObserver(ref, cb);

    return (
        <>
            <div className={"relative mb-10"}>
                <BaseInput
                    inputRef={ref}
                    name={"name"}
                    value={value}
                    placeholder={"...type"}
                    className={["mb-4", error && "border border-solid border-red"]}
                    onChange={onChange}
                />
                {error && <span className={"absolute right-0 bottom-[-10px] left-0 text-red"}>Введите только числа</span>}
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useMutationObserver</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useMutationObserverCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default MutationObserverPage;
