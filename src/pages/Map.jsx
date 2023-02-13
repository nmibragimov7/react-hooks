import React, {useState} from 'react';
import Highlight from "react-highlight";
import 'highlight.js/styles/github.css';

import BaseButton from "../components/base/BaseButton/BaseButton";
import {useMap} from "../hooks/useMap";
import {useMapCode} from "../core/consts";

const values = Array.from(
    {length: 10},
    (_, idx) => idx + 1
);

const Map = () => {
    const [shown, setShown] = useState(false);
    const selectedItemsMap = useMap();
    const toggle = (value) => {
        if(selectedItemsMap.has(value)) {
            selectedItemsMap.delete(value);
        } else {
            selectedItemsMap.add(value, true);
        }
    }

    return (
        <>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useMap</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100 mb-4"}>
                    <Highlight>
                        {useMapCode}
                    </Highlight>
                </div>
            }
            <div className={"flex gap-4"}>
                {values.map(value =>
                    <BaseButton
                        key={`values-${value}`}
                        className={"bg-primary-blue hover:bg-primary-blue/70"}
                        onClick={() => toggle(value)}
                    >
                        {value}
                    </BaseButton>
                )}
            </div>
            <div className={"text-xl text-center font-bold py-4"}>
                {selectedItemsMap.map((_value, item) => <div key={item} className={"text-purple mb-2"}>{item}</div>)}
            </div>
        </>
    );
};

export default Map;
