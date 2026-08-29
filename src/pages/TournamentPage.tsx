import { Button, Container, Group } from "@mantine/core";

function TournamentPage(): React.ReactNode {
    return (
        <Container my="md" className="page" fluid>
            <Group className="page__header">
                <h2>Le tournoi !</h2>
                <Group>
                    <Button>Pour les séries</Button> 
                </Group>
            </Group>
        </Container>
    );
}

export default TournamentPage;
