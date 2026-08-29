import { Client } from "@app/repositories/generated/api";
import { TournamentsRepository } from "@app/repositories/tournaments.repository";

export function createApiRepositories() {
    const apiClient = new Client(import.meta.env.VITE_API_BASE_URL);

    return {
        tournaments: new TournamentsRepository(apiClient),
    };
}

export type Repositories = ReturnType<typeof createApiRepositories>;