import React, {useCallback, useState} from 'react';
import axios from "axios";

import useRequest from "../hooks/useRequest";

const Request = () => {
    const [shown, setShown] = useState(false);
    const fetchData = useCallback(() => {
        return axios.get(`https://jsonplaceholder.typicode.com/todos`);
    }, []);
    const [data, loading, error] = useRequest(fetchData);
    if(loading) {
        return <div className={"text-center text-3xl text-primary-blue"}>Loading...</div>;
    }
    if(error) {
        return <div className={"text-center text-3xl text-red"}>{error}</div>;
    }

    return (
        <>
            <div className={"max-h-[80vh] overflow-x-auto shadow-gray-100 p-4 mb-10"}>
                {
                    data && data.map((item) => (
                        <div key={item.id} className={"bg-blue shadow-gray-100 text-primary-blue p-4 mb-2"}>
                            {item.id}. {item.title}
                        </div>
                    ))
                }
            </div>
            <p className={"text-center text-2xl text-dark mb-4"}>
                Реализован пользовательский хук <span
                className={"text-primary-blue hover:text-primary-blue/70 cursor-pointer"}
                onClick={() => setShown(!shown)}
            >useRequest</span>
            </p>
        </>
    );
};

export default Request;
