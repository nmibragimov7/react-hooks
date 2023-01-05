import React, {useState} from 'react';

import BaseInput from "../components/base/BaseInput/BaseInput";
import useInput from "../hooks/useInput";
import BaseButton from "../components/base/BaseButton/BaseButton";

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
                <div className={"max-w-xl mx-auto"}>
                    <code>
                        <span className={"font-bold text-orange"}>export default function</span> <span className={"font-bold text-primary-blue"}>useInput</span>(initialValue) [
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>const</span> [value, setValue] = <span className={"font-bold text-primary-blue"}>useState</span>(initialValue);
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>const</span> <span className={"font-bold text-primary-blue"}>onChange</span> = (e) => [
                        <br/>
                        <span className={"ml-8"}>setValue(e.target.value);</span>
                        <br/>
                        <span className={"ml-4"}>];</span>
                        <br/>
                        <span className={"ml-4 font-bold text-orange"}>return</span> [
                        <br/>
                        <span className={"ml-8"}>value,</span>
                        <br/>
                        <span className={"ml-8 font-bold text-primary-blue"}>onChange</span>
                        <br/>
                        <span className={"ml-4"}>];</span>
                        <br/>
                        ];
                    </code>
                </div>
            }
        </>
    );
};

export default SignIn;
