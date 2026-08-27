import { Text } from "@mantine/core";
import { modals, type OpenConfirmModal } from "@mantine/modals";

import i18n from "@app/i18n";


const t = (key: string) => i18n.t(key);

const defaultOptions: OpenConfirmModal = {
    title: <Text size="lg">{t('common.confirm')}</Text>,
    children: <Text>{t('common.areYouSure')}</Text>,
    labels: {
        confirm: t('common.confirm'),
        cancel: t('common.cancel'),
    },
    confirmProps: {
        color: 'red',
    },
    cancelProps: {
        color: 'red',
    },
};


export const confirmationService = {

    confirm: (overrides?: OpenConfirmModal) => {
        modals.openConfirmModal({
            ...defaultOptions,
            ...overrides,
        });
    },
}


