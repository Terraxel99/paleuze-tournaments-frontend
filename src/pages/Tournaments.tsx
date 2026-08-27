import { useState } from "react";

import { Button, Container, Drawer, Group, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useTranslation } from "react-i18next";

import { useApiFetch } from "@app/hooks/useApiFetch";

import TournamentCard from "@app/components/TournamentCard/TournamentCard";
import TournamentForm from "@app/components/TournamentForm/TournamentForm";
import { useApiRepositories } from "@app/contexts/api.context";


function Tournaments(): React.ReactNode {

    const { t } = useTranslation();
    const tournmentsRepository = useApiRepositories().tournaments;

    const { data: tournaments, refresh } = useApiFetch(() => tournmentsRepository.getAll());
    const [drawerOpened, { open, close }] = useDisclosure(false);
    const [tournamentToEdit, setTournamentToEdit] = useState<string | undefined>();

    const formTitle = tournamentToEdit ? t('tournaments.update') : t('tournaments.create');

    const create = () => {
        setTournamentToEdit(undefined);
        open();
    };

    const edit = (id: string) => {
        setTournamentToEdit(id);
        open();
    };

    const handleFormFinish = (hasModifications: boolean) => {
        if (hasModifications) {
            refresh();
        }

        close();
    };

    // TODO : Click outside / escape / close btn => Has modifications true ou false... ?
        // Il faut garder la fonctionnalité de pouvoir escape / close / échap AVEC confirm dialog.
    // TODO : Extraire drawer dans un "DrawerForm.tsx" => Réutilisable
        // Dans ce cas, autant séparer le drawer d'édit et de 
        // Par séparer, je veux dire qu'il faut garder UN SEUL tournamentform quand même, mais on peut faire
        // Deux DrawerForm avec l'un ayant le form en create, l'autre en edit et le handle devient plus facile.
        // Désavantage, deux useDisclosure...

    return (
        <>
            <Drawer opened={drawerOpened} onClose={close} title={formTitle} closeOnClickOutside={false} withCloseButton={false} closeOnEscape={false}>
                { 
                    tournamentToEdit ? 
                        <TournamentForm id={tournamentToEdit} onFinish={handleFormFinish} /> :
                        <TournamentForm onFinish={handleFormFinish} /> 
                }
            </Drawer>

            <Container my="md" className="page" fluid>
                <Group className="page__header">
                    <h2>{t('tournaments.title')}</h2>
                    <Container>
                        <Button onClick={create}>{t('tournaments.create')}</Button> 
                    </Container>
                </Group>

                <SimpleGrid my="lg" cols={{ base: 1, md: 2, lg: 3 }}>
                    { tournaments?.map((t) => <TournamentCard key={t.id} tournament={t} onEdit={edit} onDelete={refresh} />) }
                </SimpleGrid>
            </Container>
        </>
    );
}

export default Tournaments;
