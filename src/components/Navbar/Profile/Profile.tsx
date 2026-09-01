import { Avatar, Group, Stack, Text } from "@mantine/core";

function Profile(): React.ReactNode {
    return (
        <Stack>
            <Group>
                <Avatar src="assets/avatar.svg" />
                <Text>Thomas Dudziak</Text>
            </Group>

            <Group>

            </Group>
        </Stack>
    );
}

export default Profile;
