import { notifications, type NotificationData } from '@mantine/notifications';

import i18n from '@app/i18n';


type NotifyProps = NotificationData;

const defaultProps: Partial<NotifyProps> = {
    autoClose: 4000,
    withCloseButton: true,
};

export function notify(props: NotifyProps) {
    return notifications.show({ ...defaultProps, ...props });
}

export function notifySuccess(props: NotifyProps) {
    return notify({
        title: i18n.t('common.success'),
        color: 'lime',
        ...props,
    });
}

export function notifyError(props: NotifyProps) {
    return notify({
        title: i18n.t('common.error'),
        color: 'red',
        autoClose: 6000,
        ...props,
    });
}

export function notifyWarning(props: NotifyProps) {
    return notify({
        title: i18n.t('common.warning'),
        color: 'yellow',
        ...props,
    });
}