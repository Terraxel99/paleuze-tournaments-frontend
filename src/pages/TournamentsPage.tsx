import { useTranslation } from "react-i18next";
import { Button, Container, Group, SimpleGrid } from "@mantine/core";

import { useApiRepositories } from "@app/contexts/api.context";
import { useApiRefresh } from "@app/hooks/useApiRefresh";
import { useFormDrawer } from "@app/hooks/useFormDrawer";
import DrawerForm from "@app/components/shared/DrawerForm/DrawerFormComponent";
import TournamentCard from "@app/components/Tournaments/TournamentCard/TournamentCard";


function TournamentsPage(): React.ReactNode {

    const { t } = useTranslation();

    const tournmentsRepository = useApiRepositories().tournaments;
    const { data: tournaments, refresh } = useApiRefresh(() => tournmentsRepository.getAll());
    const [ drawerOpened, { open, close }, [tournamentEdit, setTournamentEdit] ] = useFormDrawer();

    const create = () => {
        setTournamentEdit(undefined);
        open();
    };

    const handleEditRequest = (id: string) => {
        setTournamentEdit(id);
        open();
    };    

    return (
        <>
            <DrawerForm opened={drawerOpened} type="tournament" idToEdit={tournamentEdit} onCloseRequest={close} onDataUpdate={refresh} />

            <Container my="md" className="page" fluid>
                <Group className="page__header">
                    <h2>{t('tournaments.title')}</h2>
                    <Group>
                        <Button onClick={create}>{t('tournaments.create')}</Button> 
                    </Group>
                </Group>

                <SimpleGrid my="lg" cols={{ base: 1, lg: 2 }}>
                    { tournaments?.map((t) => <TournamentCard key={t.id} tournament={t} onEdit={handleEditRequest} onDelete={refresh} />) }
                </SimpleGrid>
            </Container>
        </>
    );
}

export default TournamentsPage;
