import { copy, isArray } from "./helpers";

export const prepareEditableColumns = (columns, editedItem) => copy(
    columns.filter((e) =>
        typeof e.allowEditing === 'undefined' || e.allowEditing === true
    )).map((field) => {
        if (field.fieldType === 'select') {
            const validKeys = field.data.map(({ name }) => name);
            const value = editedItem[field.dataField];
            isArray(value) && value.length && value.forEach(v => {
                validKeys.indexOf(v) === -1 && field.data.push({
                    name: v,
                    display: v,
                });
            })
        }

        return field;
    });
