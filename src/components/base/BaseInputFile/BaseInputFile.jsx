import React, {useRef, useState} from 'react';

import file from "../../../static/images/file.svg";
import fileTake from "../../../static/images/file-take.svg";
import fileReset from "../../../static/images/file-reset.svg";

const BaseInputFile = ({
                                             name = "",
                                             handleChange}) => {
    const [fileName, setFileName] = useState('');
    const fileRef = useRef(null);
    const takeFile = () => {
        if(fileRef?.current?.files?.length) {
            setFileName(fileRef.current.files[0]?.name);
            handleChange(fileRef.current.files[0]);
        }
    }
    const resetFile = () => {
        setFileName("");
        handleChange(null);
        fileRef.current.value = null;
    }

    return (
        <>
            <label htmlFor={name}>
                {!fileName &&
                    <div className={"flex items-center gap-3 cursor-pointer bg-purple-dark rounded py-4 px-6"}>
                        <img src={fileTake} alt="take file"/>
                        <span className="font-semibold text-purple-100">
                            Загрузить .pdf
                        </span>
                    </div>
                }
                <input
                    id={name}
                    ref={fileRef}
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={takeFile}
                />
            </label>
            {fileName &&
                <div className={"flex items-center gap-14 bg-purple-dark rounded py-4 px-6"}>
                    <div className={"flex items-center gap-3"}>
                        <img src={file} alt="file"/>
                        <span className="font-semibold text-purple-100">{fileName}</span>
                    </div>
                    <img
                        src={fileReset}
                        alt="reset file"
                        className={"cursor-pointer"}
                        onClick={resetFile}
                    />
                </div>
            }
        </>
    );
};

export default BaseInputFile;
