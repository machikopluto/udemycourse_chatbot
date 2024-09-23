// components/BulkActions.js
import React from 'react';

const BulkActions = ({ onSelectAll, onDeselectAll, onDeleteSelected }) => {
    return (
        <div className="bulk-actions">
            <button onClick={onSelectAll}>Bulk Select</button>
            <button onClick={onDeselectAll}>Bulk Deselect</button>
            <button onClick={onDeleteSelected}>Bulk Delete</button>
        </div>
    );
};

export default BulkActions;