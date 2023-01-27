import React, {useCallback, useRef, useState} from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import BaseButton from "../components/base/BaseButton/BaseButton";
import {inputsCode} from "../core/consts";

const classes = `
    shadow-gray-100 
    h-full
    w-full 
    leading-none 
    bg-white-blue 
    p-4 
    placeholder:font-light 
    placeholder:text-gray 
    outline-none 
    border 
    border-solid 
    border-transparent 
    rounded
    text-5xl
    text-birch
    text-center
    font-bold
`;

const CodeInput = () => {
    const _length = 6;
    const [input, setInput] = useState("");
    const [shown, setShown] = useState(false);
    const refs = Array.from(Array(_length), () => useRef(null));
    const onKeyDown = useCallback((event, idx) => {
        if (event.key === "Backspace" && idx !== 0) {
            if (!event.target.value.length) {
                refs[idx - 1].current.focus();
            }
        }
    }, [refs]);
    const onChange = useCallback((event, idx) => {
        if (event.nativeEvent.inputType === 'insertFromPaste') {
            const letters = event.target.value.trim().split("");
            let idx = 0;

            for (const letter of letters) {
                refs[idx].current.value = letter;
                idx++;

                if (idx > _length - 1) {
                    idx = 0;
                }
            }
        } else {
            if (event.target.value.length > 1) {
                event.target.value = event.target.value.slice(1);
            }
            if (event.nativeEvent.inputType !== 'deleteContentBackward') {
                if (idx === _length - 1) {
                    refs[0].current.focus();
                } else {
                    refs[idx + 1].current.focus();
                }
            }
        }
    }, [refs]);
    const showInput = () => {
        const value = refs.map(ref => ref.current?.value).join("");
        setInput(value);
    }

    return (
        <>
            <div className={"max-w-xl mx-auto mb-10"}>
                <div className="grid grid-cols-6 gap-x-4 mb-4">
                    {refs.map((ref, idx) => (
                        <div key={idx}>
                            <input
                                ref={ref}
                                className={classes}
                                onKeyDown={(event => onKeyDown(event, idx))}
                                onChange={(event) => onChange(event, idx)}
                            />
                        </div>
                    ))}
                </div>
                <BaseButton
                    className={"bg-purple-dark hover:bg-purple-100 hover:text-purple-dark mb-4"}
                    onClick={showInput}
                >SHOW</BaseButton>
                <div className={"bg-birch-100 shadow-gray-100 text-center p-4"}>
                    <p>Значение: {input}</p>
                </div>
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >Inputs focus</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {inputsCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default CodeInput;
