import React, { useState, useEffect } from "react";
import "./PlaneacionStyles.css";

export default function EditableCell({ getValue, row, column, table }) {
    let rawValue = getValue();

    const normalize = (val) => {
        if (val === null || val === undefined) return "";
        return String(val);
    };

    const initialValue = normalize(rawValue);
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    // Se actualiza cuando cambian los datos de la tabla
    useEffect(() => {
        setValue(normalize(getValue()));
    }, [getValue]);

    const onBlur = () => {
        setIsEditing(false);
        table.options.meta?.updateData(row.index, column.id, value);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
        }
        if (e.key === "Escape") {
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    return isEditing ? (
        <input
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className="input-editable"
            autoFocus
        />
    ) : (
        <span
            onDoubleClick={() => setIsEditing(true)}
            className="cell-viewer"
            title={value || ""}
        >
            {value || ""}
        </span>
    );
}
