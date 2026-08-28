import { modals, type OpenConfirmModal } from '@mantine/modals';
import i18n from '@app/i18n';


type ConfirmProps = OpenConfirmModal;

const defaultProps: Partial<ConfirmProps> = {
    centered: true,
    title: i18n.t('common.confirmationRequired'),
    labels: {
        confirm: i18n.t('common.confirm'),
        cancel: i18n.t('common.cancel'),
    },
    confirmProps: {
        color: 'lime',
    },
    cancelProps: {
        color: 'red',
    },
};

export function confirm(props: ConfirmProps) {
    return modals.openConfirmModal({ ...defaultProps, ...props });
}

export function confirmDangerousAction(props: ConfirmProps) {
    return confirm({
        confirmProps: { color: 'red' },
        centered: true,
        ...props,
    });
}

export function confirmDelete(props: ConfirmProps) {
    return confirmDangerousAction(props);
}
