import {useMatchMedia} from "../../hooks/useMatchMedia";

export const useInputCode = `
    export default function useInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        const onChange = (e) => {
            setValue(e.target.value);
        }
    
        return {
            value,
            onChange
        }
    }
`;
export const useHoverCode = `
    export default function useHover(ref) {
        const [isHovering, setHovering] = useState(false);
        const on = () => setHovering(true);
        const off = () => setHovering(false);
        useEffect(() => {
            if(!ref.current) {
                return;
            }
            const node = ref.current;
            node.addEventListener('mouseenter', on);
            node.addEventListener('mousemove', on);
            node.addEventListener('mouseleave', off);
    
            return () => {
                node.removeEventListener('mouseenter', on);
                node.removeEventListener('mousemove', on);
                node.removeEventListener('mouseleave', off);
            }
        }, [ref]);
    
        return isHovering;
    }
`;
export const useScrollCode = `
    export default function useScroll(parent, child, cb) {
        const observer = useRef();
    
        useEffect(() => {
            const options = {
                root: parent.current,
                rootMargin: '0px',
                threshold: 0
            }
            observer.current = new IntersectionObserver(([target]) => {
                if(target.isIntersecting) {
                    cb();
                }
            }, options);
            const childRef = child.current;
            observer.current.observe(childRef);
            return () => {
                observer.current.unobserve(childRef);
            }
        }, [cb, parent, child]);
    }
`;
export const useDebounceCode = `
    export default function useDebounce(cb, delay) {
        const timer = useRef();
        return useCallback((...args) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(async () => {
                await cb(...args);
            }, delay);
        }, [timer, cb, delay]);
    }
`;
export const useRequestCode = `
    export default function useRequest(request) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            setLoading(true);
            setTimeout(() => {
                request()
                    .then(response => setData(response.data))
                    .catch(error => setError(error.message))
                    .finally(() => setLoading(false));
            }, 1000);
        }, [request]);
    
        return [data, loading, error];
    }
`;
export const useThrottleCode = `
    export default function useThrottle(cb, delay) {
        const isThrottled = useRef(null);
        return useCallback((...args) => {
            if (isThrottled.current) {
                return;
            }
            cb(args);
            isThrottled.current = true;
            setTimeout(() => isThrottled.current = false, delay);
        }, [cb, delay]);
    }
`;
export const useMaskInputCode = `
    export const useMaskInput = (payload) => {
        const {mask, initValue, setValue} = payload;
    
        const inputRef = useRef(null);
        const maskedRef = useRef(null);
        const changeValue = useCallback(() => {
            maskedRef.current = IMask(
                inputRef.current, {
                    mask
                });
            maskedRef.current.value = initValue;
            maskedRef.current.on("accept", () => {
                setValue(maskedRef.current.unmaskedValue);
            })
        }, []);
    
        useEffect(() => {
            if (inputRef.current) {
                changeValue();
            }
        }, [changeValue, inputRef]);
    
        return {inputRef};
    }
`;
export const useLazyImageCode = `
    export default function useLazyImage(elements) {
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
            return () => {
                elements.forEach((element) => {
                    observer.current.unobserve(element.current);
                });
            }
        }, [elements]);
    }
`;
export const useVideoCode = `
    export function useVideo(element) {
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
`;
export const useMenuCode = `
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
                                link.current.classList.remove('bg-$[link.current.dataset.color]');
                            }
                            link.current.classList.add("bg-birch");
                        });
                        const id = entry.target.id;
                        const activeLink = document.querySelector('[data-id=$[id]]')
                        if(activeLink) {
                            activeLink.classList.remove("bg-birch");
                            activeLink.classList.add('bg-$[activeLink.dataset.color]');
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
`;
export const useMatchMediaCode = `
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
`;
export const useMutationObserverCode = `
    const options = {
        attributes: true
    }
    export function useMutationObserver(ref, cb) {
        const cbRef = useRef();
        const observer = useRef();
    
        useLayoutEffect(() => {
            cbRef.current = cb;
        }, []);
        useEffect(() => {
            const element = ref.current;
            if(!element) return;
            observer.current = new MutationObserver(([mutation]) => {
                cbRef.current(mutation);
            });
            observer.current.observe(element, options);
    
            return () => observer.current.disconnect();
        }, [ref, cbRef, options]);
    }
`;
export const useSetCode = `
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
`;
export const useMapCode = `
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
`;
export const toBase64Code = `
    const [base64, setBase64] = useState("");
    
    const handleFile = (file) => {
        if (!file) {
            setBase64("");
            return;
        }

        return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            reader.onload = function (evt) {
                resolve(evt.target.result);
            }
            reader.readAsDataURL(file);
            reader.onerror = reject;
        }).then(response => {
            setBase64(response)
        })
    }
`;
export const toCrc32Code = `
    export const getCrc32 = (...props) => {
        let [s] = props;
        s = String(s)
        let c = 0
        let j = 0
        let polynomial = props.length < 2 ? 0x04C11DB7 : props[1],
            initialValue = props.length < 3 ? 0xFFFFFFFF : props[2],
            finalXORValue = props.length < 4 ? 0xFFFFFFFF : props[3],
            crc = initialValue,
            table = []
    
        function reverse(x, n) {
            let b = 0
            while (n) {
                b = b * 2 + x % 2
                x /= 2
                x -= x % 1
                n--
            }
            return b
        }
    
        let range = 255
        c = 0
        for (let i = 0; i < s.length; i++) {
            c = s.charCodeAt(i)
            if(c > range) {
                range = c
            }
        }
    
        for (let i = range; i >= 0; i--) {
            c = reverse(i, 32)
    
            for (let j = 0; j < 8; j++) {
                c = ((c * 2) ^ (((c >>> 31) % 2) * polynomial)) >>> 0
            }
    
            table[i] = reverse(c, 32)
        }
    
        for (let i = 0; i < s.length; i++) {
            c = s.charCodeAt(i)
            if (c > range) {
                throw new RangeError()
            }
            j = (crc % 256) ^ c
            crc = ((crc / 256) ^ table[j]) >>> 0
        }
    
        return (crc ^ finalXORValue) >>> 0
    }
`;
export const inputsCode = `
    const refs = Array.from(Array(_length), () => useRef(null));
    const onKeyDown = useCallback((event, idx) => {
        if (event.key === "Backspace" && idx !== 0) {
            if (!event.target.value.length) {
                refs[idx - 1].current.focus();
            }
        }
    }, [refs]);
    const onChange = useCallback((event, idx) => {
        if (event.nativeEvent.inputType === 'insertFromPaste') {
            const letters = event.target.value.trim().split("");
            let idx = 0;

            for (const letter of letters) {
                refs[idx].current.value = letter;
                idx++;

                if (idx > _length - 1) {
                    idx = 0;
                }
            }
        } else {
            if (event.target.value.length > 1) {
                event.target.value = event.target.value.slice(1);
            }
            if (event.nativeEvent.inputType !== 'deleteContentBackward') {
                if (idx === _length - 1) {
                    refs[0].current.focus();
                } else {
                    refs[idx + 1].current.focus();
                }
            }
        }
    }, [refs]);
`;
