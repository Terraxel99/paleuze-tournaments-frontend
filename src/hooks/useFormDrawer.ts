import { useState } from "react";

import { useDisclosure } from "@mantine/hooks";


export function useFormDrawer() {

    const [opened, { open, close }] = useDisclosure(false);
    const [editId, setEditId] = useState<string | undefined>();

    return [
        opened,
        { open, close },
        [ editId, setEditId ]
    ] as const;
}
