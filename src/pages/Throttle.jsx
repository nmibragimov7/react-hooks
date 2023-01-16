import React, {useCallback, useEffect, useState} from 'react';
import useThrottle from "../hooks/useThrottle";

const Throttle = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });
    const cb = useCallback((event) => {
        console.log('kek')
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
                Реализован пользовательский хук <span className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}>useThrottle</span>
            </p>
        </>
    );
};

export default Throttle;
