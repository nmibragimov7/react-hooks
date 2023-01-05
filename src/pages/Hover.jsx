import React, {useRef, useState} from 'react';

import useHover from "../hooks/useHover";

const Hover = () => {
    const [shown, setShown] = useState(false);
    const ref = useRef();
    const isHovering = useHover(ref);
    let classes = ["w-80 h-80 mx-auto mb-10 bg-primary-blue"];
    if(isHovering) {
        classes.push("!bg-green");
    }

    return (
        <>
            <div ref={ref} className={classes.join(" ")}/>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useHover</span>
            </p>
            {shown &&
            <div className={"max-w-xl mx-auto"}>
                <code>
                    <span className={"font-bold text-orange"}>export default function</span> <span className={"font-bold text-primary-blue"}>useHover</span>(ref) [
                    <br/>
                    <span className={"ml-4 font-bold text-orange"}>const</span> [isHovering, setHovering] = <span className={"font-bold text-primary-blue"}>useState</span>(<span className={"font-bold text-orange"}>false</span>);
                    <br/>
                    <span className={"ml-4 font-bold text-orange"}>const</span> <span className={"font-bold text-primary-blue"}>on</span> = () => setHovering(<span className={"font-bold text-orange"}>true</span>);
                    <br/>
                    <span className={"ml-4 font-bold text-orange"}>const</span> <span className={"font-bold text-primary-blue"}>off</span> = () => setHovering(<span className={"font-bold text-orange"}>false</span>);
                    <br/>
                    <div className={"ml-4"}>
                        <span className={"font-bold text-primary-blue"}>useEffect</span>(() => [
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>if</span>(!ref.current) [
                        <br/>
                        <span className={"ml-8 font-bold text-orange"}>return;</span>
                        <br/>
                        <span className={"ml-4"}>]</span>
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>const</span> node = ref.current;
                        <br/>
                        <span className={"ml-4"}>node.addEventListener('mouseenter', on);</span>
                        <br/>
                        <span className={"ml-4"}>node.addEventListener('mousemove', on);</span>
                        <br/>
                        <span className={"ml-4"}>node.addEventListener('mouseleave', off);</span>
                        <br/>
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>return</span> () => [
                        <br/>
                        <span className={"ml-8"}>node.removeEventListener('mouseenter', on);</span>
                        <br/>
                        <span className={"ml-8"}>node.removeEventListener('mousemove', on);</span>
                        <br/>
                        <span className={"ml-8"}>node.removeEventListener('mouseleave', off);</span>
                        <br/>
                        <span className={"ml-4"}>]</span>
                        <br/>
                        ], [ref]);
                    </div>
                    ];
                </code>
            </div>}
        </>
    );
};

export default Hover;
