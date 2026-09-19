import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertTriangle, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  index: number;
  darkMode: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  tasks: CheckCircle2,
  time: Clock,
  alerts: AlertTriangle,
  team: Users,
};

const colorMap: Record<string, string> = {
  tasks: 'from-indigo-500 to-blue-500',
  time: 'from-emerald-500 to-teal-500',
  alerts: 'from-amber-500 to-orange-500',
  team: 'from-purple-500 to-pink-500',
};

export default function StatCard({ title, value, change, icon, index, darkMode }: StatCardProps) {
  const Icon = iconMap[icon] || CheckCircle2;
  const gradient = colorMap[icon] || 'from-indigo-500 to-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      } shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {Math.abs(change)}%
        </span>
        <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          vs semana pasada
        </span>
      </div>
    </motion.div>
  );
}
