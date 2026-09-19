import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import Charts from './components/Charts';
import ProjectList from './components/ProjectList';
import TaskBoard from './components/TaskBoard';
import ActivityFeed from './components/ActivityFeed';
import { initialTasks } from './data';
import { Task } from './types';

const stats = [
  { title: 'Tareas Completadas', value: '142', change: 12, icon: 'tasks' },
  { title: 'Horas Productivas', value: '38.5h', change: 8, icon: 'time' },
  { title: 'Tareas Pendientes', value: '23', change: -5, icon: 'alerts' },
  { title: 'Miembros Activos', value: '12', change: 15, icon: 'team' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCard key={stat.title} {...stat} index={index} darkMode={darkMode} />
              ))}
            </div>

            {/* Charts */}
            <Charts darkMode={darkMode} />

            {/* Projects & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectList darkMode={darkMode} />
              <ActivityFeed darkMode={darkMode} />
            </div>
          </div>
        );

      case 'tasks':
        return <TaskBoard tasks={tasks} setTasks={setTasks} darkMode={darkMode} />;

      case 'analytics':
        return (
          <div className="space-y-6">
            <Charts darkMode={darkMode} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectList darkMode={darkMode} />
              <ActivityFeed darkMode={darkMode} />
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <ProjectList darkMode={darkMode} />
            <Charts darkMode={darkMode} />
          </div>
        );

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-8 ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
            } shadow-sm`}
          >
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ⚙️ Configuración
            </h3>
            <div className="space-y-6">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tema
                </h4>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Selecciona el modo de visualización
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDarkMode(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !darkMode
                        ? 'bg-indigo-500 text-white'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    ☀️ Claro
                  </button>
                  <button
                    onClick={() => setDarkMode(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      darkMode
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    🌙 Oscuro
                  </button>
                </div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notificaciones
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Las notificaciones están habilitadas para todas las tareas.
                </p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Stack Tecnológico
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['React 18', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Recharts', '@dnd-kit', 'Lucide Icons', 'Vite'].map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const tabTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    tasks: 'Gestor de Tareas',
    analytics: 'Analíticas',
    projects: 'Proyectos',
    settings: 'Configuración',
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`sticky top-0 z-40 px-8 py-4 ${
            darkMode ? 'bg-gray-900/80' : 'bg-gray-50/80'
          } backdrop-blur-xl border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tabTitles[activeTab]}
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {activeTab === 'dashboard' && 'Resumen general de tu productividad'}
                {activeTab === 'tasks' && 'Organiza y prioriza tus tareas'}
                {activeTab === 'analytics' && 'Métricas y tendencias de rendimiento'}
                {activeTab === 'projects' && 'Gestiona tus proyectos activos'}
                {activeTab === 'settings' && 'Personaliza tu experiencia'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`relative hidden md:block`}>
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className={`pl-10 pr-4 py-2 rounded-xl text-sm w-64 ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-500'
                      : 'bg-white text-gray-900 border-gray-200 placeholder-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2.5 rounded-xl ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nueva Tarea</span>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
