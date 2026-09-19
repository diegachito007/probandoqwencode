import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Flag, Calendar, Tag } from 'lucide-react';
import { Task } from '../types';

interface TaskBoardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  darkMode: boolean;
}

const priorityColors = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const priorityLabels = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

const statusLabels = {
  todo: '📋 Por hacer',
  'in-progress': '⚡ En progreso',
  done: '✅ Completada',
};

function SortableTask({ task, darkMode }: { task: Task; darkMode: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={`p-4 rounded-xl border ${
        isDragging
          ? 'shadow-xl ring-2 ring-indigo-500 z-50'
          : darkMode
          ? 'border-gray-700 bg-gray-700/50'
          : 'border-gray-100 bg-white'
      } transition-shadow`}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className={`mt-1 cursor-grab active:cursor-grabbing ${
            darkMode ? 'text-gray-500' : 'text-gray-300'
          } hover:text-gray-500`}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-medium text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {task.title}
            </h4>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
              <Flag className="w-3 h-3" />
              {priorityLabels[task.priority]}
            </span>
          </div>
          <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {task.description}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Calendar className="w-3 h-3" />
              {task.dueDate}
            </span>
            <div className="flex gap-1">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TaskBoard({ tasks, setTasks, darkMode }: TaskBoardProps) {
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex((t) => t.id === active.id);
      const newIndex = filteredTasks.findIndex((t) => t.id === over.id);
      const reordered = arrayMove(filteredTasks, oldIndex, newIndex);

      // Rebuild full tasks array
      const otherTasks = tasks.filter((t) => !filteredTasks.find((ft) => ft.id === t.id));
      setTasks([...otherTasks, ...reordered]);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      } shadow-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Tareas
        </h3>
        <div className={`flex gap-1 p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {(['all', 'todo', 'in-progress', 'done'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : darkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f === 'all' ? 'Todas' : statusLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <SortableTask key={task.id} task={task} darkMode={darkMode} />
              ))}
            </div>
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      {filteredTasks.length === 0 && (
        <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          No hay tareas en esta categoría
        </div>
      )}
    </motion.div>
  );
}
