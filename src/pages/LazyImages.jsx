import React, {useRef, useState} from 'react';
import Highlight from "react-highlight";
import 'highlight.js/styles/github.css';

import useLazy from "../hooks/useLazy";
import {useLazyCode} from "../core/consts";
import image1 from "../static/images/0.jpg";
import image2 from "../static/images/4.jpg";
import image3 from "../static/images/5.jpg";

const images = [
    {
        src: image1,
        alt: "alt-1"
    },
    {
        src: image2,
        alt: "alt-2"
    },
    {
        src: image3,
        alt: "alt-3"
    }
];

const LazyImages = () => {
    const [shown, setShown] = useState(false);
    const refs = Array.from(Array(images.length), () => useRef(null));
    useLazy(refs);

    return (
        <>
            <div className={"min-h-screen shadow-gray-100"}>
                <p className={"text-center text-2xl text-dark mb-4"}>
                    Реализован пользовательский хук <span
                    className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                    onClick={() => setShown(!shown)}
                >useLazy</span>
                </p>
                {shown &&
                <div className={"max-w-4xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useLazyCode}
                    </Highlight>
                </div>
                }
            </div>
            {images.map((image, idx) => (
                <img
                    key={image.alt}
                    ref={refs[idx]}
                    data-src={image.src}
                    alt={image.alt}
                    className={"w-1/2 h-auto mx-auto"}
                />
            ))}
        </>
    );
};

export default LazyImages;
