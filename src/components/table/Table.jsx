import React from 'react';
import './table.css';

function Table({ columns, rows, onEdit, onDelete }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Actions</th> {/* Colonne pour les actions */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
              <td>
                <button onClick={() => onEdit(row)}>Modifier</button>
                <button onClick={() => onDelete(row)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;