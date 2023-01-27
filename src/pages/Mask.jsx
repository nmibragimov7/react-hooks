import React, {useState} from 'react';
import {useFormik} from "formik";
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import {useMaskInput} from "../hooks/useMaskInput";
import BaseButton from "../components/base/BaseButton/BaseButton";
import {useMaskInputCode} from "../core/consts";

const classes = "shadow-gray-100 h-full w-full leading-none bg-white-blue p-4 placeholder:font-light placeholder:text-gray outline-none border border-solid border-transparent mb-4";

const Mask = () => {
    const [shown, setShown] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: "",
            iin: ""
        }
    });
    const {inputRef: username} = useMaskInput({
        mask: "+7(000)000-00-00",
        initValue: formik.values.username,
        setValue(value) {
            formik.setFieldValue("username", value);
        },
    });
    const {inputRef: iin} = useMaskInput({
        mask: "0000-0000-0000",
        initValue: formik.values.iin,
        setValue(value) {
            formik.setFieldValue("iin", value);
        },
    });

    return (
        <>
            <div className={"flex flex-col gap-2 max-w-3xl mx-auto mb-10"}>
                <input
                    ref={username}
                    className={classes}
                    placeholder={"+7(###)###-##-##"}
                />
                <input
                    ref={iin}
                    className={classes}
                    placeholder={"####-####-####"}
                />
                <BaseButton className={"bg-purple-dark hover:bg-purple-100 hover:text-purple-dark mb-4"} onClick={formik.submitForm}>SHOW</BaseButton>
                <div className={"bg-birch-100 shadow-gray-100 text-center p-4"}>
                    <p>Логин: {formik.values.username}</p>
                    <p>ИИН: {formik.values.iin}</p>
                </div>
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useMaskInput</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useMaskInputCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default Mask;
