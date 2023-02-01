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
