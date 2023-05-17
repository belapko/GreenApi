import React from 'react';
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Auth from "./components/Auth";
import Main from "./components/Main";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth/>
    },
    {
        path: '/app',
        element: <Main/>
    },
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;