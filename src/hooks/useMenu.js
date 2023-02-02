import {useEffect, useRef} from "react";

export function useMenu(blocks, links) {
    const observer = useRef();
    const options = {
        threshold: [0.25, 0.5, 0.75]
    };

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    links.forEach(link => {
                        const idx = Object.entries(link.current.classList).findIndex(item => item[1].includes(link.current.dataset.color));
                        if(idx >= 0) {
                            link.current.classList.remove(`bg-${link.current.dataset.color}`);
                        }
                        link.current.classList.add("bg-birch");
                    });
                    const id = entry.target.id;
                    const activeLink = document.querySelector(`[data-id=${id}]`)
                    if(activeLink) {
                        activeLink.classList.remove("bg-birch");
                        activeLink.classList.add(`bg-${activeLink.dataset.color}`);
                    }
                }
            })
        }, options);

        blocks.forEach((block) => {
            observer.current.observe(block.current);
        });
        return () => {
            blocks.forEach((block) => {
                if(block.current) {
                    observer.current.unobserve(block.current);
                }
            });
        }
    }, []);
}
