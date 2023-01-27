import {useCallback, useRef} from "react";

export default function useDebounce(cb, delay) {
    const timer = useRef();
    return useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(async () => {
            await cb(...args);
        }, delay);
    }, [timer, cb, delay]);
}
