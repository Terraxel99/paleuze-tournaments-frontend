import { useTranslation } from "react-i18next";

import { ActionIcon, Button, Card } from "@mantine/core";
import { TrashIcon } from "@phosphor-icons/react";

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
    const tournamentsRepository = useApiRepositories().tournaments;
    
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
