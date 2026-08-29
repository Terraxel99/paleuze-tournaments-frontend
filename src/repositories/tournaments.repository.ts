import type { Client, ITournamentResponse, TournamentRequest } from "@app/repositories/generated/api";

export class TournamentsRepository {
    
    private _client: Client;

    constructor(apiClient: Client) {
        this._client = apiClient;
    }

    async getAll(): Promise<ITournamentResponse[]> {
        const tournaments = await this._client.tournamentsAll();
        return tournaments.map((t) => t.toJSON());
    }

    async getById(id: string): Promise<ITournamentResponse> {
        const tournament = await this._client.tournamentsGET(id);
        return tournament.toJSON();
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
