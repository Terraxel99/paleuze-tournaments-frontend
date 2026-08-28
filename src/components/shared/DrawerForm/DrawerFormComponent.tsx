import { useState } from "react";

import { Drawer } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { FORM_REGISTRY, type FormType } from "@app/utils/formRegistry";
import { confirmDangerousAction } from "@app/utils/confirmation.helper";

interface Props {
    opened: boolean;
    idToEdit: string | undefined;
    type: FormType;
    onCloseRequest: () => void;
    onDataUpdate: () => void;
}

function DrawerForm({ opened, idToEdit, type, onCloseRequest, onDataUpdate }: Props) {

    const { t } = useTranslation();
    const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

    const config = type ? FORM_REGISTRY[type] : undefined;
    const formTitle = config?.getTitle(idToEdit);
    const FormComponent = config?.component;


    const requestDrawerClosure = () => onCloseRequest();

    const handleFormCancel = () => {
        if (!isFormDirty) {
            requestDrawerClosure();
            return;
        }

        confirmDangerousAction({
            children: t('forms.sureCancelModifications'),
            onConfirm: requestDrawerClosure,
        });
    };

    const handleFormComplete = () => {
        onDataUpdate?.();
        requestDrawerClosure();
    };

    return (
        <Drawer opened={opened} onClose={handleFormCancel} title={formTitle}>
            { FormComponent && 

                <FormComponent idToEdit={idToEdit} onCancel={handleFormCancel}
                    onSuccessCompletion={handleFormComplete} onDirtyChange={setIsFormDirty} /> 
            }
        </Drawer>
    );
}

export default DrawerForm;
