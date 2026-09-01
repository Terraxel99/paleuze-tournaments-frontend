import { Group, Image } from "@mantine/core";
import { useTranslation } from "react-i18next";

function Header(): React.ReactNode {

    const { t } = useTranslation();

    return (
        <Group className="header" h="100%" px="md">
            <Image h="100%" w="65px" mr="md" ml="sm" src="assets/paleuze-logo.png" fit="contain"/>
            <h1>{t('common.appTitle')}</h1>
        </Group>
    );
}

export default Header;
