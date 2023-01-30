import {useEffect, useRef} from "react";

export default function useLazy(elements) {
    const observer = useRef();
    const options = {
        rootMargin: '50px 0px 0px',
    };

    useEffect(() => {
        observer.current = new IntersectionObserver((etnries, observer) => {
            etnries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach((element) => {
            observer.current.observe(element.current);
        });
    }, [elements]);
}
