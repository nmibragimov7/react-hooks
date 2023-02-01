import React, {useRef, useState} from 'react';
import Highlight from "react-highlight";
import 'highlight.js/styles/github.css';

import {useVideo} from "../hooks/useVideo";
import {useVideoCode} from "../core/consts";

const Video = () => {
    const [shown, setShown] = useState(false);
    const ref = useRef();
    useVideo(ref);

    return (
        <>
            <div className={"min-h-screen shadow-gray-100 mb-4"}>
                <p className={"text-center text-2xl text-dark mb-4"}>
                    Реализован пользовательский хук <span
                    className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                    onClick={() => setShown(!shown)}
                >useVideo</span>
                </p>
                {shown &&
                    <div className={"max-w-4xl mx-auto shadow-gray-100"}>
                        <Highlight>
                            {useVideoCode}
                        </Highlight>
                    </div>
                }
            </div>
            <video
                ref={ref}
                src="https://r350106.kujo-jotaro.com/kimetsu-no-yaiba/3/11.480.272f28bec7ff2764.mp4?hash1=65b3fda72e695d4961b71cdc184185eb&hash2=37d6d435d518ca8ac52aa192324e7439"
                width={"100%"}
                height={"300px"}
                controls
                className={"mb-4"}
            ></video>
            <div className={"min-h-screen shadow-gray-100"}/>
        </>
    );
};

export default Video;
