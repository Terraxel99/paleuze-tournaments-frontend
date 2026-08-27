import type { Client, TournamentRequest, TournamentResponse } from "@app/repositories/generated/api";
import { notifications } from "@mantine/notifications";

export class TournamentsRepository {
    
    private _client: Client;

    constructor(apiClient: Client) {
        this._client = apiClient;
    }

    async getAll(): Promise<TournamentResponse[]> {

        try {
            const data = await this._client.tournamentsAll();

            notifications.show({
                title: 'common.success',
                message: 'tournaments.success.get',
                color: 'grape'
            });


            // Callback here ????

            return data;
        } catch (e) {

            notifications.show({
                title: 'common.fail',
                message: 'tournaments.fail.get',
                color: 'red'
            });

            throw e;
        }

    }

    async getById(id: string): Promise<TournamentResponse> {
        return await this._client.tournamentsGET(id);
    }

    async create(tournament: TournamentRequest): Promise<string> {
        return await this._client.tournamentsPOST(tournament);
    }

    async update(id: string, tournament: TournamentRequest): Promise<void> {
        return await this._client.tournamentsPUT(id, tournament);
    }

    async delete(id: string): Promise<void> {
        return await this._client.tournamentsDELETE(id);
    }
}
