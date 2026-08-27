import { ActionIcon, TextInput, type MantineStyleProp } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

import { CheckIcon, CopySimpleIcon } from "@phosphor-icons/react";


interface Props {
    label: string;
    value: string;
}


export function CopyTextInput({ label, value }: Props): React.ReactNode {

    const clipboard = useClipboard();

    const copy = () => {
        if (clipboard.copied) {
            return;
        }

        clipboard.copy(value);
    }

    const cursorStyle: MantineStyleProp = { pointerEvents: clipboard.copied ? "none" : undefined };

    return (
        <TextInput 
            disabled
            label={label}
            value={value}  
            rightSection={
                <ActionIcon variant="transparent" onClick={copy} style={cursorStyle}>
                    { clipboard.copied ? <CheckIcon /> : <CopySimpleIcon  /> }
                </ActionIcon> 
            } 
        />
    );
}
