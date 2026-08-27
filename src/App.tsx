import { AppShell, Group, type AppShellHeaderConfiguration, type AppShellNavbarConfiguration } from "@mantine/core";

import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const HEADER_HEIGHT: number = 100;
const NAVBAR_WIDTH: number = 300;

function App() {

    const { t } = useTranslation();

    const headerProps: AppShellHeaderConfiguration = { height: HEADER_HEIGHT };
    const navbarProps: AppShellNavbarConfiguration = { width: NAVBAR_WIDTH, breakpoint: 'sm' };

    return (
        <AppShell header={headerProps} navbar={navbarProps} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <h1>{t('common.appTitle')}</h1>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                Work in progress...
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
