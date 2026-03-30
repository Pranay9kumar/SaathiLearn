import React from 'react';
import { BookOpen, Clock3, Eye, LifeBuoy } from 'lucide-react';
import { GlassCard } from './UI/GlassCard';
import { AnimatedButton } from './UI/AnimatedButton';
import './StudentCard.css';

const formatLastActive = (value) => {
  if (!value) return 'No activity yet';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No activity yet';

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

export const StudentCard = ({ student, onViewDetails }) => {
  return (
    <GlassCard className="student-card animate-fade-in">
      <div className="student-card__header">
        <div>
          <h3 className="student-card__name">{student.name}</h3>
          <p className="student-card__email">{student.email}</p>
        </div>
        <span className="badge badge-info">{student.className || 'Class N/A'}</span>
      </div>

      <div className="student-card__meta">
        <div className="student-card__meta-row">
          <LifeBuoy size={15} />
          <span>{student.helpRequests} help request(s)</span>
        </div>
        <div className="student-card__meta-row">
          <Clock3 size={15} />
          <span>{formatLastActive(student.lastActive)}</span>
        </div>
      </div>

      <div className="student-card__subjects">
        {(student.subjects || []).length > 0 ? (
          student.subjects.map((subject) => (
            <span key={`${student.id}-${subject}`} className="student-subject-chip">
              <BookOpen size={12} />
              {subject}
            </span>
          ))
        ) : (
          <span className="student-subject-chip student-subject-chip--empty">No subjects yet</span>
        )}
      </div>

      <div className="student-card__footer">
        <AnimatedButton icon={Eye} onClick={() => onViewDetails(student)}>
          View Details
        </AnimatedButton>
      </div>
    </GlassCard>
  );
};
