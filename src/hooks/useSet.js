import {useMemo, useState} from "react";

export function useSet(initialValue) {
    const [set] = useState(() => new Set(initialValue));
    const [size, setSize] = useState(set.size);

    const componentSet = useMemo(() => {
        return {
            add(value) {
                const result = set.add(value);
                setSize(set.size);

                return result;
            },
            delete(value) {
                const result = set.delete(value);
                setSize(set.size);

                return result;
            },
            has(value) {
                return set.has(value);
            },
            clear() {
                set.clear();
                setSize(0);
            },
            map(cb) {
                const result = [];
                set.forEach(item => {
                    result.push(cb(item))
                })

                return result;
            },
            get size() {
                return size;
            }
        }
    }, [set, size]);

    return componentSet;
}
