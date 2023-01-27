import React, {useRef, useState} from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import useHover from "../hooks/useHover";
import {useHoverCode} from "../core/consts";

const Hover = () => {
    const [shown, setShown] = useState(false);
    const ref = useRef();
    const isHovering = useHover(ref);
    let classes = ["w-80 h-80 mx-auto mb-10 bg-primary-blue"];
    if(isHovering) {
        classes.push("!bg-green");
    }

    return (
        <>
            <div ref={ref} className={classes.join(" ")}/>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useHover</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useHoverCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default Hover;
