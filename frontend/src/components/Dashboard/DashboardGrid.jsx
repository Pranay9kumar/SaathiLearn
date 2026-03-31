import React from 'react';

/**
 * 3-column grid: left 2/3 (analytics + table), right 1/3 (activity + alerts + insights)
 */
const DashboardGrid = ({ analytics, table, activity, alerts, insights }) => (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <section className="xl:col-span-2 flex flex-col gap-5">
      {analytics}
      {table}
    </section>
    <aside className="xl:col-span-1 flex flex-col gap-5">
      {activity}
      {alerts}
      {insights}
    </aside>
  </div>
);

export default DashboardGrid;
