import React from 'react';

import BaseButton from "../components/base/BaseButton/BaseButton";
import {useSet} from "../hooks/useSet";

const values = Array.from(
    {length: 10},
    (_, idx) => idx + 1
);

const Set = () => {
    const selectedItemsSet = useSet();
    const toggle = (value) => {
        if(selectedItemsSet.has(value)) {
            selectedItemsSet.delete(value);
        } else {
            selectedItemsSet.add(value);
        }
    }

    return (
        <>
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
                {selectedItemsSet.map((item) => <div key={item} className={"text-purple mb-2"}>{item}</div>)}
            </div>
        </>
    );
};

export default Set;
