/**
 * Student Utilities — Shared helpers for student data processing.
 * Used by Mentor, Admin, and Student dashboards.
 */

/**
 * Format "last active" from a date string into a human-readable relative time
 */
export const formatLastActive = (value) => {
  if (!value) return 'No activity yet';
  if (typeof value === 'string' && !value.includes('-') && !value.includes('T')) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || 'No activity yet';

  const now = Date.now();
  const diffMs = now - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hr ago`;
  return `${Math.floor(diffMs / day)} day(s) ago`;
};

/**
 * Get display label for health status
 */
export const getStatusLabel = (status) => {
  switch (status) {
    case 'green': return 'Active';
    case 'yellow': return 'Idle';
    case 'red': return 'At Risk';
    default: return 'Unknown';
  }
};

/**
 * Get Tailwind classes for health status badge
 */
export const getStatusClasses = (status) => {
  switch (status) {
    case 'green':
      return {
        badge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        dot: 'bg-emerald-500',
      };
    case 'yellow':
      return {
        badge: 'bg-amber-50 border-amber-200 text-amber-700',
        dot: 'bg-amber-500',
      };
    case 'red':
      return {
        badge: 'bg-red-50 border-red-200 text-red-700',
        dot: 'bg-red-500',
      };
    default:
      return {
        badge: 'bg-slate-50 border-slate-200 text-slate-600',
        dot: 'bg-slate-400',
      };
  }
};

/**
 * Sort students by a given key
 */
export const sortStudents = (students, key = 'name', direction = 'asc') => {
  return [...students].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (typeof valA === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return direction === 'asc' ? valA - valB : valB - valA;
  });
};

/**
 * Filter students by search term and health status
 */
export const filterStudents = (students, searchTerm = '', statusFilter = 'All') => {
  return students.filter(s => {
    const matchesSearch = !searchTerm || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (statusFilter === 'All') return matchesSearch;
    if (statusFilter === 'Active') return matchesSearch && s.healthStatus === 'green';
    if (statusFilter === 'Idle') return matchesSearch && s.healthStatus === 'yellow';
    if (statusFilter === 'At Risk') return matchesSearch && s.healthStatus === 'red';
    return matchesSearch;
  });
};

/**
 * Get initials from a name string
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};
