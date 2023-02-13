import {useMemo, useState} from "react";

// new Map() - [[key, value], [key, value]]
export const useMap = (initialValue) => {
    const [map] = useState(() => new Map(initialValue));
    const [size, setSize] = useState(map.size);

    const componentMap = useMemo(() => {
        return {
            add(key, value) {
                const result = map.set(key, value);
                setSize(map.size);

                return result;
            },
            delete(key) {
                const result = map.delete(key);
                setSize(map.size);

                return result;
            },
            has(key) {
                return map.has(key);
            },
            clear() {
                map.clear();
                setSize(0);
            },
            map(cb) {
                const result = [];
                map.forEach((value, key) => {
                    result.push(cb(value, key))
                })

                return result;
            },
            get size() {
                return size;
            }
        }
    }, [map, size]);

    return componentMap;
}
