import React, { useState, useEffect } from 'react';
import './PlaneacionStyles.css'; // Asegúrate de importar el CSS

export default function EditableCell({ getValue, row, column, table }) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        setIsEditing(false);
        table.options.meta?.updateData(row.index, column.id, value);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        } else if (e.key === 'Escape') {
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className="input-editable" 
                autoFocus
            />
        );
    }

    return (
        <span 
            onDoubleClick={() => setIsEditing(true)} 
            className="cell-viewer"
            title={value}
        >
            {value}
        </span>
    );
}