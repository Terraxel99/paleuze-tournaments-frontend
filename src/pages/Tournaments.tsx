import { useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Container, Group, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useApiRepositories } from "@app/contexts/api.context";
import { useApiRefresh } from "@app/hooks/useApiRefresh";
import DrawerForm from "@app/components/shared/DrawerForm/DrawerFormComponent";
import TournamentCard from "@app/components/Tournaments/TournamentCard/TournamentCard";


function Tournaments(): React.ReactNode {

    const { t } = useTranslation();

    const tournmentsRepository = useApiRepositories().tournaments;
    const { data: tournaments, refresh } = useApiRefresh(() => tournmentsRepository.getAll());

    // TODO : could we combine this into a single custom hook ?
    const [formOpened, { open, close }] = useDisclosure(false);
    const [tournamentToEdit, setTournamentToEdit] = useState<string | undefined>();

    const create = () => {
        setTournamentToEdit(undefined);
        open();
    };

    const handleEditRequest = (id: string) => {
        setTournamentToEdit(id);
        open();
    };    

    return (
        <>
            <DrawerForm opened={formOpened} type="tournament" idToEdit={tournamentToEdit} onCloseRequest={close} onDataUpdate={refresh} />

            <Container my="md" className="page" fluid>
                <Group className="page__header">
                    <h2>{t('tournaments.title')}</h2>
                    <Container>
                        <Button onClick={create}>{t('tournaments.create')}</Button> 
                    </Container>
                </Group>

                <SimpleGrid my="lg" cols={{ base: 1, md: 2, lg: 3 }}>
                    { tournaments?.map((t) => <TournamentCard key={t.id} tournament={t} onEdit={handleEditRequest} onDelete={refresh} />) }
                </SimpleGrid>
            </Container>
        </>
    );
}

export default Tournaments;
