import React from 'react';
import { motion } from 'framer-motion';

const TableCard = ({ title, subtitle, columns, rows, onRowClick }) => (
  <motion.div
    className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
  >
    <div className="px-5 py-4 border-b border-slate-100">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2.5 px-4 text-[11px] uppercase tracking-widest text-slate-400 font-semibold ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {rows.map((row, idx) => {
            const key = row?.id ?? row?.email ?? idx;
            return (
              <tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => {
                  const content = col.render ? col.render(row) : row[col.key];
                  const align = col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left';
                  return (
                    <td key={col.key} className={`py-3 px-4 align-middle ${align}`}>
                      {col.truncate !== false ? (
                        <div className="truncate max-w-[180px]">{content}</div>
                      ) : (
                        <div>{content}</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export default TableCard;
