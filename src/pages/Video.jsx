import React, {useRef} from 'react';

import {useLazyVideo} from "../hooks/useLazyVideo";

const Video = () => {
    const ref = useRef();
    useLazyVideo(ref);

    return (
        <>
            <div className={"min-h-screen shadow-gray-100 mb-4"}/>
            <video
                ref={ref}
                src="https://www.youtube.com/watch?v=ZYqBZmU-tA0&t=171s"
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
