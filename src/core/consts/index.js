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
