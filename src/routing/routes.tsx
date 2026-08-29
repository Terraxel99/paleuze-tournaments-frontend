import { createBrowserRouter, redirect } from "react-router-dom";

import App from "@app/App";

import TournamentsPage from "@app/pages/TournamentsPage";
import TournamentPage from "@app/pages/TournamentPage";


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
                element: <TournamentsPage />,
            },
            {  
                path: ':id',
                element: <TournamentPage />,
            },
        ],
    }
]);