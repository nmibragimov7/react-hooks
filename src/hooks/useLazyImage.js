import {useEffect, useRef} from "react";

export default function useLazyImage(elements) {
    const observer = useRef();
    const options = {
        rootMargin: '50px 0px 0px',
    };

    useEffect(() => {
        observer.current = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach((element) => {
            observer.current.observe(element.current);
        });
        return () => {
            elements.forEach((element) => {
                if(element.current) {
                    observer.current.unobserve(element.current);
                }
            });
        }
    }, []);
}
