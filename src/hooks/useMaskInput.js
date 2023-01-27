import {useCallback, useEffect, useRef} from "react";
import IMask from "imask";

export const useMaskInput = (payload) => {
    const {mask, initValue, setValue} = payload;

    const inputRef = useRef(null);
    const maskedRef = useRef(null);
    const changeValue = useCallback(() => {
        maskedRef.current = IMask(
            inputRef.current, {
                mask
            });
        maskedRef.current.value = initValue;
        maskedRef.current.on("accept", () => {
            setValue(maskedRef.current.unmaskedValue);
        })
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            changeValue();
        }
    }, [changeValue, inputRef]);

    return {inputRef};
}
