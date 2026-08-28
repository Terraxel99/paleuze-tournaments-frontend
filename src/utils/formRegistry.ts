import type { ComponentType } from "react";

import i18n from "@app/i18n";
import TournamentForm from "@app/components/Tournaments/TournamentForm/TournamentForm";

interface FormConfig {
    component: ComponentType<FormComponentProps>;
    getTitle: (id: string | undefined) => string;
}

export interface FormComponentProps {
    idToEdit: string | undefined;

    onDirtyChange?: (isFormDirty: boolean) => void;
    onCancel?: () => void;
    onSuccessCompletion?: () => void;
}

export type FormType = 'tournament';

export const FORM_REGISTRY: Record<FormType, FormConfig> = {

    tournament: {
        component: TournamentForm,
        getTitle: (id) => id ? i18n.t('tournaments.update') : i18n.t('tournaments.create'),
    },

};
