import React from "react";
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

import Layout from "./layout/Layout";
import SignIn from "./pages/SignIn";
import Hover from "./pages/Hover";
import List from "./pages/List";
import Search from "./pages/Search";
import Request from "./pages/Request";
import Throttle from "./pages/Throttle";
import Mask from "./pages/Mask";
import ConvertFile from "./pages/ConvertFile";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path={"/"} element={<Layout />}>
            <Route index element={<SignIn />}/>
            <Route path={"hover"} element={<Hover />}/>
            <Route path={"list"} element={<List />}/>
            <Route path={"search"} element={<Search />}/>
            <Route path={"request"} element={<Request />}/>
            <Route path={"throttle"} element={<Throttle />}/>
            <Route path={"mask-input"} element={<Mask />}/>
            <Route path={"convert-file"} element={<ConvertFile />}/>
        </Route>
    </>
));

function App() {

    return (
        <RouterProvider router={router} />
    );
}

export default App;
