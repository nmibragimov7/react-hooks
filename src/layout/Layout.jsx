import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from "../components/widgets/Header/Header";

const Layout = () => {
    return (
        <div className={"bg-light-blue min-h-screen"}>
            <Header />
            <div className={"container mx-auto py-10"}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;
