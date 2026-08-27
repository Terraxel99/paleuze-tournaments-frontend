import { Button, createTheme, Drawer } from "@mantine/core";

export const mantineTheme = createTheme({
    components: {

        Button: Button.extend({
            defaultProps: {
                color: 'violet',
                variant: 'filled',
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

    },
});