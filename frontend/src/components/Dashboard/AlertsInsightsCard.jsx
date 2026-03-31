import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb, TrendingUp, Star, Zap } from 'lucide-react';

const AlertsInsightsCard = () => {
  const alerts = useMemo(() => [
    { 
      id: 'al1', 
      text: '2 missions due this week. Plan your schedule to avoid delays.',
      icon: AlertCircle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700'
    },
    { 
      id: 'al2', 
      text: 'Your streak is strong. One quick quiz today keeps momentum.',
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700'
    },
    { 
      id: 'al3', 
      text: 'Open "In Review" items to unlock mentor badges.',
      icon: Star,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    },
  ], []);

  const insights = useMemo(() => [
    { 
      id: 'in1', 
      label: 'Most active subject', 
      value: 'Math',
      icon: '📊',
      tone: 'success',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    { 
      id: 'in2', 
      label: 'Focus area',
      value: 'Reading',
      icon: '📖',
      tone: 'warning',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    { 
      id: 'in3', 
      label: 'Next milestone',
      value: 'Level 6',
      icon: '🎯',
      tone: 'info',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
    },
  ], []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Alerts Card */}
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <AlertCircle size={20} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Alerts</div>
              <div className="text-xs text-blue-100 mt-0.5">Important reminders for you</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
          {alerts.map((alert, idx) => {
            const IconComponent = alert.icon;
            return (
              <motion.div
                key={alert.id}
                className={`${alert.bgColor} ${alert.borderColor} border rounded-xl p-4 flex gap-3 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + idx * 0.05 }}
              >
                <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${alert.color}`}>
                  <IconComponent size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${alert.textColor}`}>{alert.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Insights Card */}
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.25 }}
      >
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Insights</div>
              <div className="text-xs text-emerald-100 mt-0.5">Personalized signals for growth</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
          {insights.map((insight, idx) => (
            <motion.div
              key={insight.id}
              className={`${insight.bgColor} ${insight.borderColor} border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + idx * 0.05 }}
            >
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest font-semibold text-slate-500">{insight.label}</div>
                <div className={`text-lg font-bold mt-2 bg-gradient-to-r ${insight.color} bg-clip-text text-transparent`}>
                  {insight.value}
                </div>
              </div>
              <div className="text-2xl">{insight.icon}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AlertsInsightsCard;
