import { motion } from 'framer-motion';
import { CheckCircle2, Plus, MessageSquare, Edit3 } from 'lucide-react';
import { Activity } from '../types';
import { activities } from '../data';

interface ActivityFeedProps {
  darkMode: boolean;
}

const typeIcons = {
  complete: CheckCircle2,
  create: Plus,
  comment: MessageSquare,
  update: Edit3,
};

const typeColors = {
  complete: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  create: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  comment: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  update: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function ActivityFeed({ darkMode }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      } shadow-sm`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Actividad Reciente
      </h3>
      <div className="space-y-4">
        {activities.map((activity: Activity, index: number) => {
          const Icon = typeIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[activity.type]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  <span className="font-medium">{activity.action}</span>
                </p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activity.project}
                </p>
              </div>
              <span className={`text-xs whitespace-nowrap ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
