import React, {useCallback, useRef} from 'react';

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

    return (
        <>
            <div className="max-w-xl mx-auto grid grid-cols-6 gap-x-4">
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
        </>
    );
};

export default CodeInput;
