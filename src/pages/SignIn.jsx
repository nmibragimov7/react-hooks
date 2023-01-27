import React, {useState} from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import BaseInput from "../components/base/BaseInput/BaseInput";
import useInput from "../hooks/useInput";
import BaseButton from "../components/base/BaseButton/BaseButton";
import {useInputCode} from "../core/consts";

const SignIn = () => {
    const username = useInput("");
    const password = useInput("");
    const [shown, setShown] = useState(false);

    return (
        <>
            <div className={"max-w-md mx-auto mb-10"}>
                <p className={"text-center text-gray-500 text-4xl mb-4"}>Авторизация</p>
                <BaseInput
                    name={"username"}
                    {...username}
                    placeholder={"type here username..."}
                />
                <BaseInput
                    name={"password"}
                    type={"password"}
                    {...password}
                    placeholder={"type here password..."}
                    autoComplete={"new-password"}
                />
                <BaseButton>Войти</BaseButton>
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                    className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                    onClick={() => setShown(!shown)}
                >useInput</span>
            </p>
            {shown &&
                <div className={"max-w-3xl mx-auto shadow-gray-100"}>
                    <Highlight>
                        {useInputCode}
                    </Highlight>
                </div>
            }
        </>
    );
};

export default SignIn;
