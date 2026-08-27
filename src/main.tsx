import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { ApiProvider } from '@app/contexts/api.context';
import { router } from '@app/routing/routes.tsx';
import { mantineTheme } from '@app/themes/mantine';
import "@app/i18n";


import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import '@app/styles/main.scss';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
            <ModalsProvider>

                <Notifications />

                <ApiProvider>
                    <RouterProvider router={router} />
                </ApiProvider>

            </ModalsProvider>
        </MantineProvider>
    </StrictMode>,
)
