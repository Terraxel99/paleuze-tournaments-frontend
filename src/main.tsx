import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { router } from '@app/routing/routes.ts';

import './index.css';
import '@mantine/core/styles.css';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    </StrictMode>,
)
