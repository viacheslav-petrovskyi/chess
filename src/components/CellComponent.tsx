import React from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export const CellComponent: React.FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <button
      type="button"
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      style={{ background: cell.available && cell.figure ? 'green' : '' }}
      onClick={() => click(cell)}
    >
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </button>
  );
};
