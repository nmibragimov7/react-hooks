import {useEffect, useLayoutEffect, useRef} from "react";

const options = {
    attributes: true
}
export function useMutationObserver(ref, cb) {
    const cbRef = useRef();
    const observer = useRef();

    useLayoutEffect(() => {
        cbRef.current = cb;
    }, []);
    useEffect(() => {
        const element = ref.current;
        if(!element) return;
        observer.current = new MutationObserver(([mutation]) => {
            cbRef.current(mutation);
        });
        observer.current.observe(element, options);

        return () => observer.current.disconnect();
    }, [ref, cbRef, options]);
}
