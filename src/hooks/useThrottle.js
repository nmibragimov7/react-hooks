import {useCallback, useRef} from "react";

export default function useThrottle(cb, delay) {
    const isThrottled = useRef(null);
    return useCallback((...args) => {
        if (isThrottled.current) {
            return;
        }
        cb(args);
        isThrottled.current = true;
        setTimeout(() => isThrottled.current = false, delay);
    }, [cb, delay]);
}
