import { AppShell, type AppShellHeaderConfiguration, type AppShellNavbarConfiguration } from "@mantine/core";
import { Outlet } from "react-router-dom";

import Navbar from "@app/components/Navbar/Navbar";
import Header from "@app/components/Header/Header";

const HEADER_HEIGHT: number = 100;
const NAVBAR_WIDTH: number = 300;

function App() {

    const headerProps: AppShellHeaderConfiguration = { height: HEADER_HEIGHT };
    const navbarProps: AppShellNavbarConfiguration = { width: NAVBAR_WIDTH, breakpoint: 'sm' };

    return (
        <AppShell header={headerProps} navbar={navbarProps} padding="md">
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
