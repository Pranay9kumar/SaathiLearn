import React from 'react';
import { motion } from 'framer-motion';

const TableCard = ({ title, subtitle, columns, rows, onRowClick, delay = 0 }) => (
  <motion.div
    className="bg-white rounded-2xl border border-[#e0e7ff] overflow-hidden h-full flex flex-col shadow-[0_4px_16px_rgba(14,165,233,0.08)] hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut', delay }}
  >
    <div className="px-6 py-5 border-b border-[#e0e7ff] bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="text-base font-bold text-slate-900">{title}</div>
      {subtitle && <div className="text-sm text-slate-600 mt-1 font-medium">{subtitle}</div>}
    </div>

    <div className="overflow-x-auto flex-1">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-[#e0e7ff] h-12 bg-blue-50/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-3 px-5 text-[11px] uppercase tracking-widest text-slate-600 font-bold ${
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
                className={`border-b border-[#e0e7ff] last:border-0 hover:bg-blue-50/60 transition-colors h-14 ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => {
                  const content = col.render ? col.render(row) : row[col.key];
                  const align = col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left';
                  return (
                    <td key={col.key} className={`py-3 px-5 align-middle font-medium text-slate-800 ${align}`}>
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
