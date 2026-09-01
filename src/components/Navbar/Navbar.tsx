import { Divider, Stack } from "@mantine/core";

import Profile from "@app/components/Navbar/Profile/Profile";
import NavbarShortcuts from "@app/components/Navbar/NavbarShorcuts/NavbarShortcuts";


function Navbar(): React.ReactNode {
    return (
        <Stack justify="space-between" h="100%" >

            <NavbarShortcuts />

            <Stack>
                <Divider />
                <Profile />
            </Stack>

        </Stack>
    );
}

export default Navbar;
