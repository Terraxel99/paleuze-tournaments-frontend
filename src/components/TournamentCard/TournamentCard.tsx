import { useTranslation } from "react-i18next";

import { ActionIcon, Button, Card } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { TrashIcon } from "@phosphor-icons/react";

import type { TournamentResponse } from "@app/repositories/generated/api";
import { confirmationService } from "@app/services/confirmation.service";

interface Props {
    tournament: TournamentResponse;
    onEdit: (id: string) => void;
    onDelete: () => void;
}

function TournamentCard({ tournament, onEdit, onDelete }: Props): React.ReactNode {

    const { t } = useTranslation();
    
    const deleteTournament = async () => {
        /*try {
            await apiClient.tournamentsDELETE(tournament.id);

            notifications.show({
                title: t('common.success'),
                message: t('tournaments.success.delete'),
                color: 'lime',
            });

            onDelete();
        } catch {
            notifications.show({
                title: t('common.error'),
                message: t('tournaments.errors.delete'),
                color: 'red',
            });
        }*/
    };

    const handleDelete = () => {
        confirmationService.confirm({
            onConfirm: deleteTournament,
        });
    };

    return (
        <Card padding="md" withBorder>
            <Card.Section>
                <Button onClick={() => onEdit(tournament.id!)}>{tournament.name}</Button>
                <ActionIcon onClick={handleDelete}><TrashIcon /></ActionIcon>
            </Card.Section>
        </Card>
    )
}

export default TournamentCard;
