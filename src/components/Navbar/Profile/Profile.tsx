import { ActionIcon, Avatar, Button, Group, Stack, Text } from "@mantine/core";
import { GearIcon, SignOutIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

function Profile(): React.ReactNode {

    const { t } = useTranslation();

    return (
        <Stack>
            <Group>
                <Avatar color="initials">TD</Avatar>
                <Text>Thomas Dudziak</Text>
            </Group>

            <Group>
                <ActionIcon variant="subtle" color="gray"><GearIcon size={28} /></ActionIcon>
                <Button color="red" leftSection={<SignOutIcon />}>{ t('common.logout') }</Button>
            </Group>
        </Stack>
    );
}

export default Profile;
