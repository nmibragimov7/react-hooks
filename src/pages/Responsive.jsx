import React, {useState} from 'react';
import Highlight from "react-highlight";
import 'highlight.js/styles/github.css';

import {useMatchMedia} from "../hooks/useMatchMedia";
import {useMatchMediaCode} from "../core/consts";

const Responsive = () => {
    const [shown, setShown] = useState(false);
    const {isMobile, isTablet, isDesktop} = useMatchMedia();

    return (
        <>
            {isMobile && <div className={"text-center text-2xl text-purple-dark mb-4"}>Mobile component</div>}
            {isTablet && <div className={"text-center text-2xl text-purple-dark mb-4"}>Tablet component</div>}
            {isDesktop && <div className={"text-center text-2xl text-purple-dark mb-4"}>Desktop component</div>}
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useMatchMedia</span>
            </p>
            {shown &&
                <div className={"max-w-6xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useMatchMediaCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default Responsive;
