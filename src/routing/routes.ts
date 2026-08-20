import { createBrowserRouter } from "react-router-dom";

import App from "@app/App";
import Home from "@app/pages/Home";


export const router = createBrowserRouter([
    {
        path: '/',
        element: App(),
        children: [
            {
                index: true,
                element: Home(),
            }
        ]
    }
]);