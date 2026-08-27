import { createBrowserRouter, redirect } from "react-router-dom";

import App from "@app/App";
import Tournaments from "@app/pages/Tournaments";


export const router = createBrowserRouter([
    {
        path: '/',
        loader: () => redirect('/tournaments'),
    },
    {
        path: '/tournaments',
        element: <App />,
        children: [
            {
                index: true,
                element: <Tournaments />,
            },
        ],
    }
]);