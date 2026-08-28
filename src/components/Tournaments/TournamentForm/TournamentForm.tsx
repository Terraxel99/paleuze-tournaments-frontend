import { useEffect } from "react";

import { useTranslation } from 'react-i18next';
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, Group, Stack, TextInput } from "@mantine/core";

import { CopyTextInput } from "@app/components/shared";
import { useApiRepositories } from "@app/contexts/api.context";
import { TournamentRequest, type ITournamentRequest } from "@app/repositories/generated/api";
import { notifyError, notifySuccess } from "@app/utils/notifications.helper";


interface Props {
    idToEdit: string | undefined;

    onDirtyChange?: (isDirty: boolean) => void;
    onCancel?: () => void;
    onSuccessCompletion?: () => void;
}

function TournamentForm({ idToEdit: id, onCancel, onSuccessCompletion, onDirtyChange }: Props): React.ReactNode {

    const { t } = useTranslation();
    const tournamentsRepository = useApiRepositories().tournaments;

    const form = useForm<ITournamentRequest>({
        mode: 'uncontrolled',
        validate: {
            name: isNotEmpty(),
        }
    });

    const handleCancel = () => onCancel?.();
    const completeForm = () => {
        form.resetDirty();

        onDirtyChange?.(false);
        onSuccessCompletion?.();
    };

    useEffect(() => {
        // If component has no ID, it is in create mode and so, no fetch required.
        if (!id) {
            return;
        }

        const loadTournament = async () => {
            try {
                const tournament = await tournamentsRepository.getById(id);
                form.initialize(tournament as ITournamentRequest);
            } catch {
                notifyError({ message: t('tournaments.errors.load') });
            }
        };

        loadTournament();
    }, [id]);

    useEffect(() => onDirtyChange?.(form.isDirty()), [form.values]);

    const handleEdit = async (data: TournamentRequest) => {
        try {
            await tournamentsRepository.update(id!, data);
            notifySuccess({ message: t('tournaments.success.edit') });
            completeForm();
        } catch {
            notifyError({ message: t('tournaments.errors.edit') });
        }
    };

    const handleCreate = async (data: TournamentRequest) => {
        try {
            await tournamentsRepository.create(data);
            notifySuccess({ message: t('tournaments.success.create') });
            completeForm();
        } catch {
            notifySuccess({ message: t('tournaments.errors.create') });
        }
    }

    const handleSubmit = async (values: ITournamentRequest) => {
        const data = new TournamentRequest(values);
        return id ? handleEdit(data) : handleCreate(data);
    };

    return (
        <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                { id && <CopyTextInput label={t('common.id')} value={id} /> }

                <TextInput withAsterisk label={t('tournaments.name')} placeholder={t('tournaments.name')}
                    key={form.key('name')} {...form.getInputProps('name')} />
            </Stack>

            <Group my="lg" className="form__actions">
                <Button color="red" disabled={form.submitting} onClick={handleCancel}>{t('common.cancel')}</Button>
                <Button type="submit" loading={form.submitting}>{t('common.confirm')}</Button>
            </Group>

        </form>
    );
}

export default TournamentForm;
