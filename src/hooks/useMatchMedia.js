import {useLayoutEffect, useState} from "react";

const queries = [
    '(max-width: 766px)',
    '(min-width: 767px) and (max-width: 1199px)',
    '(min-width: 1200px)',
];

export function useMatchMedia() {
    const mediaQueries = queries.map(query => matchMedia(query));
    const getValues = () => mediaQueries.map(mql => mql.matches);
    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () => setValues(getValues);
        mediaQueries.forEach(query => query.addEventListener("change", handler));

        return () => {
            mediaQueries.forEach(query => query.removeEventListener("change", handler));
        }
    }, []);

    return ["isMobile", "isTablet", "isDesktop"].reduce((acc, screen, idx) => {
        return {
            ...acc,
            [screen]: values[idx]
        }
    }, {});
}
