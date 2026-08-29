import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ActionIcon, Badge, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { InfoIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

import { useApiRepositories } from "@app/contexts/api.context";
import { notifyError, notifySuccess } from "@app/utils/notifications.helper";
import type { ITournamentResponse } from "@app/repositories/generated/api";
import { confirmDelete } from "@app/utils/confirmation.helper";

interface Props {
    tournament: ITournamentResponse;
    onEdit: (id: string) => void;
    onDelete: () => void;
}

function TournamentCard({ tournament, onEdit, onDelete }: Props): React.ReactNode {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const tournamentsRepository = useApiRepositories().tournaments;


    const navigateToTournament = () => {
        navigate(`/tournaments/${tournament.id}`);
    };
    
    const deleteTournament = async () => {
        try {
            await tournamentsRepository.delete(tournament.id!);
            notifySuccess({ message: t('tournaments.success.delete') });
            onDelete();
        } catch {
            notifyError({ message: t('tournaments.errors.delete') });
        }
    };

    const handleDelete = () => {
        confirmDelete({
            children: t('tournaments.confirm.delete'),
            onConfirm: deleteTournament,
        });
    };

    const status = 'completed'; // TODO: Change when statuses exist in BE.

    return (
        <Card className={`tournament__card status status-${status}`} padding="lg" withBorder>

            <Group justify="space-between">

                <Stack gap="xs">
                    <Stack gap={0}>
                        <Text size="xs" c="dimmed">{ tournament.id }</Text>
                        <Text>{ tournament.name }</Text>
                    </Stack>
                    
                    <Badge className="tournament__card__badge">{ t(`statuses.${status}`) }</Badge>
                </Stack>

                <Group gap="xs">
                    <Tooltip color="gray" label={t('tournaments.goto')}>
                        <ActionIcon color="gray" onClick={navigateToTournament}><InfoIcon /></ActionIcon>
                    </Tooltip>

                    <Tooltip color="gray" label={t('common.edit')}>
                        <ActionIcon onClick={() => onEdit(tournament.id!)}><PencilSimpleIcon /></ActionIcon>
                    </Tooltip>

                    <Tooltip label={t('common.delete')}>
                        <ActionIcon color="red" onClick={handleDelete}><TrashIcon /></ActionIcon>
                    </Tooltip>
                </Group>

            </Group>
        </Card>
    )
}

export default TournamentCard;
