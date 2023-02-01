import {useEffect, useRef} from "react";

export function useLazyVideo(element) {
    const observer = useRef();
    const options = {
        threshold: [0.2, 0.8]
    };

    useEffect(() => {
        observer.current = new IntersectionObserver(([entry]) => {
            if(entry.target.currentTime === 0) return;
            if(!entry.isIntersecting || entry.intersectionRatio <= 0.2) {
                entry.target.pause();
            } else {
                entry.target.play();
            }
        }, options);

        observer.current.observe(element.current);
        return () => {
            if(element.current) {
                observer.current.unobserve(element.current);
            }
        }
    }, []);
}
