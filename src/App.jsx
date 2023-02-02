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
import CodeInput from "./pages/CodeInput";
import LazyImages from "./pages/LazyImages";
import Video from "./pages/Video";
import Menu from "./pages/Menu";
import Responsive from "./pages/Responsive";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path={"/"} element={<Layout />}>
            <Route index element={<SignIn />}/>
            <Route path={"hover"} element={<Hover />}/>
            <Route path={"list"} element={<List />}/>
            <Route path={"search"} element={<Search />}/>
            <Route path={"request"} element={<Request />}/>
            <Route path={"throttle"} element={<Throttle />}/>
            <Route path={"lazy-images"} element={<LazyImages />}/>
            <Route path={"autoplay-video"} element={<Video />}/>
            <Route path={"menu"} element={<Menu />}/>
            <Route path={"responsive"} element={<Responsive />}/>

            <Route path={"mask-input"} element={<Mask />}/>
            <Route path={"convert-file"} element={<ConvertFile />}/>
            <Route path={"verification-code"} element={<CodeInput />}/>
        </Route>
    </>
));

function App() {

    return (
        <RouterProvider router={router} />
    );
}

export default App;
