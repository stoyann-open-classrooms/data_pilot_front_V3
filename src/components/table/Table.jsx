import React from 'react';
import './table.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
          {Array.isArray(rows) && rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column === 'Date de début' ? new Date(row.dateStart).toLocaleDateString()  :
                   column === 'Date de fin' ? new Date(row.dateEnd).toLocaleDateString():
                   row[`data_${colIndex + 1}`] && row[`data_${colIndex + 1}`][0]}
                </td>
              ))}
              <td className='action-container'>
                <button className="icon-button" onClick={() => onEdit(row)}><FaEdit /></button>
                <button className="icon-button delete" onClick={() => onDelete(row)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
