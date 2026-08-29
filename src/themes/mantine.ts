import { ActionIcon, Badge, Button, createTheme, Drawer, Tooltip } from "@mantine/core";

export const mantineTheme = createTheme({

    primaryColor: 'violet',

    components: {

        Button: Button.extend({
            defaultProps: {
                variant: 'filled',
            },
        }),

        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: 'outline',
            },
        }),

        Badge: Badge.extend({
            defaultProps: {
                variant: 'outline',
            },
        }),
        
        Drawer: Drawer.extend({
            defaultProps: {
                position: 'left',
                offset: 6,
                overlayProps: {
                    backgroundOpacity: .4,
                    blur: 4,
                },
            },
        }),

        Tooltip: Tooltip.extend({
            defaultProps: {
                color: 'gray',
            },
        }),

    },
});