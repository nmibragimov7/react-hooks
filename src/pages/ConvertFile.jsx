import React, {useMemo, useState} from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import BaseInputFile from "../components/base/BaseInputFile/BaseInputFile";
import {getCrc32} from "../core/helpers";
import {toBase64Code, toCrc32Code} from "../core/consts";

const ConvertFile = () => {
    const [shownBase64, setShownBase64] = useState(false);
    const [shownCrc32, setShownCrc32] = useState(false);
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
    const crc = useMemo(() => {
        if (base64) {
          return getCrc32(base64);
        }

        return null;
    }, [base64]);

    return (
        <>
            <div className={"flex justify-center mb-8"}>
                <BaseInputFile name={"file"} handleChange={handleFile}/>
            </div>
            <div className={"mb-4"}>
                <p
                    className={"text-xl text-purple-dark hover:text-purple-dark/70 text-center cursor-pointer"}
                    onClick={() => setShownBase64(!shownBase64)}
                >BASE64</p>
                <div className={"p-4 shadow-gray-100 bg-birch-100 overflow-y-auto mb-4"}>
                    {base64}
                </div>
                {shownBase64 &&
                    <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                        <Highlight>
                            {toBase64Code}
                        </Highlight>
                    </div>
                }
            </div>
            <div className={"mb-4"}>
                <p
                    className={"text-xl text-purple-dark hover:text-purple-dark/70 text-center cursor-pointer"}
                    onClick={() => setShownCrc32(!shownCrc32)}
                >CRC32 hash</p>
                <div className={"p-4 shadow-gray-100 bg-birch-100 overflow-y-auto text-center mb-4 text-purple font-bold"}>
                    {crc}
                </div>
                {shownCrc32 &&
                    <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                        <Highlight>
                            {toCrc32Code}
                        </Highlight>
                    </div>
                }
            </div>
        </>
    );
};

export default ConvertFile;
