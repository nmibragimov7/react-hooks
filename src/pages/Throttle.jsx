import React, {useCallback, useEffect, useState} from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import useThrottle from "../hooks/useThrottle";
import {useThrottleCode} from "../core/consts";

const Throttle = () => {
    const [shown, setShown] = useState(false);
    const [state, setState] = useState({
        x: 0,
        y: 0
    });
    const cb = useCallback((event) => {
        setState(prev => ({...prev, x: event[0].clientX, y: event[0].clientY}));
    }, []);
    const throttleMouseMove = useThrottle(cb, 1000);

    useEffect(() => {
        document.addEventListener("mousemove", event => throttleMouseMove(event));
        return () => document.removeEventListener("mousemove", throttleMouseMove);
    }, [throttleMouseMove]);

    return (
        <>
            <div className={"text-center mb-10"}>
                <p className={"text-2xl text-primary-blue mb-4"}>Приложение отслеживает движение мыши с задержкой 1000мс</p>
                <p className={"text-dark font-semibold"}>
                    позиция по X: <span className={"text-gray-500"}>{state.x}</span>
                </p>
                <p className={"text-dark font-semibold"}>
                    позиция по Y: <span className={"text-gray-500"}>{state.y}</span>
                </p>
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"} onClick={() => setShown(!shown)}>useThrottle</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useThrottleCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default Throttle;
