import { useEffect } from "react";

import { useTranslation } from 'react-i18next';

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { CopyTextInput } from "@app/components/shared";

import { confirmationService } from "@app/services/confirmation.service";
import { TournamentRequest, type ITournamentRequest } from "@app/repositories/generated/api";
import { useApiRepositories } from "@app/contexts/api.context";


interface Props {
    id?: string;
    onFinish?: (hasModifications: boolean) => void;
}


function TournamentForm({ id, onFinish }: Props): React.ReactNode {

    // const tournamentsRepository = useApiRepositories().tournaments;

    const { t } = useTranslation();
    const form = useForm<ITournamentRequest>({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
        },
        validate: {
            name: isNotEmpty(),
        }
    });

    // TODO : Peut-on extraire ça en hook ?
    // On pourrait voir pour foutre un callback dans useApiFetch pour set les values, mettre une notif etc...
    useEffect(() => {
        // If component has no ID, it is in create mode, no fetch needed.
        if (!id) {
            return;
        }

        const loadTournament = async () => {
            /*try {
                const tournament = await apiClient.tournamentsGET(id!);
    
                form.setValues(tournament);
                form.setInitialValues(tournament as ITournamentRequest);
            } catch {
                notifications.show({ 
                    title: t('common.error'),
                    message: t('tournaments.errors.load'),
                    color: 'red',
                });

                onFinish?.(false);
            }*/
        };

        loadTournament();
    }, [id]);

    // TODO : Faudrait-il pas des repositories plutôt que d'appeler directement NSWAG avec les noms et le typage pourri ?
    const handleEdit = async (id: string, data: TournamentRequest) => {
        /*try {
            await apiClient.tournamentsPUT(id, data);

            notifications.show({
                title: t('common.success'),
                message: t('tournaments.success.edit'),
                color: 'lime',
            });
            onFinish?.(true);
        } catch {
            notifications.show({
                title: t('common.error'),
                message: t('tournaments.errors.edit'),
                color: 'red',
            });
        }*/
    };

    const handleCreate = async (data: TournamentRequest) => {
        /*try {
            await apiClient.tournamentsPOST(data);
            
            notifications.show({
                title: t('common.success'),
                message: t('tournaments.success.create'),
                color: 'lime',
            });
            onFinish?.(true);
        } catch {
            notifications.show({
                title: t('common.error'),
                message: t('tournaments.errors.create'),
                color: 'red',
            });
        }*/
    }

    const handleSubmit = async (values: ITournamentRequest) => {
        const data = new TournamentRequest(values);

        return id ?
            handleEdit(id, data) :
            handleCreate(data);
    };

    const handleCancel = () => {
        if (!form.isDirty()) {
            onFinish?.(false);
            return;
        }

        confirmationService.confirm({
            onConfirm: () => onFinish?.(false),
        });
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
