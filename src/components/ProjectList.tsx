import { motion } from 'framer-motion';
import { projects } from '../data';

interface ProjectListProps {
  darkMode: boolean;
}

export default function ProjectList({ darkMode }: ProjectListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      } shadow-sm`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Proyectos Activos
      </h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`p-4 rounded-xl ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            } hover:scale-[1.01] transition-transform`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.name}
                </span>
              </div>
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.progress}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: project.color }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {project.completed}/{project.tasks} tareas
              </span>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {project.tasks - project.completed} pendientes
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
