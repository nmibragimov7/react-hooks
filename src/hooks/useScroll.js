import {useEffect, useRef} from "react";

export default function useScroll(parent, child, cb) {
    const observer = useRef();

    useEffect(() => {
        const options = {
            root: parent.current,
            rootMargin: '0px',
            threshold: 0 // 1 - если дочерний элемент появился полностью, 0 - дочерний элемент появился в зоне видимости
        }
        observer.current = new IntersectionObserver(([target]) => {
            if(target.isIntersecting) {
                // срабатывает, когда дочерний элемент появится, чтобы вызвать коллбэк
                cb();
            }
        }, options);
        // указывает за каким элементом следить
        const childRef = child.current;
        observer.current.observe(childRef);
        return () => {
            observer.current.unobserve(childRef);
        }
    }, [cb, parent, child]);
}
