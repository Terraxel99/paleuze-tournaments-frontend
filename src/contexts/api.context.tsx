import { createContext, useContext, useMemo } from "react";

import { createApiRepositories, type Repositories } from "@app/repositories";


const ApiContext = createContext<Repositories | null>(null);

export function ApiProvider({ children }: { children: React.ReactNode }) {

    const repositories = useMemo(() => createApiRepositories(), []);

    return (
        <ApiContext.Provider value={repositories}>
            { children }
        </ApiContext.Provider>
    );
}

export function useApiRepositories() {
    const repositories = useContext(ApiContext);

    if (!repositories) {
        throw new Error("Hook useApiRepositories must be used within an ApiContext.");
    }

    return repositories;
}
