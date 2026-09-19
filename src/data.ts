import { Task, Project, ChartData, Activity } from './types';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Diseñar landing page',
    description: 'Crear mockups para la nueva landing page del producto',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-01-20',
    tags: ['diseño', 'frontend'],
  },
  {
    id: '2',
    title: 'Configurar base de datos',
    description: 'Setup inicial de Supabase con tablas principales',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-01-18',
    tags: ['backend', 'database'],
  },
  {
    id: '3',
    title: 'Escribir tests unitarios',
    description: 'Cobertura de tests para componentes críticos',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-01-22',
    tags: ['testing'],
  },
  {
    id: '4',
    title: 'Optimizar rendimiento',
    description: 'Mejorar tiempos de carga y bundle size',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-01-25',
    tags: ['performance', 'frontend'],
  },
  {
    id: '5',
    title: 'Documentar API',
    description: 'Crear documentación Swagger para endpoints REST',
    status: 'done',
    priority: 'low',
    dueDate: '2026-01-15',
    tags: ['docs', 'backend'],
  },
  {
    id: '6',
    title: 'Implementar autenticación',
    description: 'Login con OAuth y JWT tokens',
    status: 'done',
    priority: 'high',
    dueDate: '2026-01-12',
    tags: ['auth', 'backend'],
  },
  {
    id: '7',
    title: 'Revisión de código',
    description: 'Code review del PR #142',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-01-19',
    tags: ['review'],
  },
  {
    id: '8',
    title: 'Deploy a staging',
    description: 'Desplegar última versión al entorno de staging',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-01-14',
    tags: ['deploy', 'ops'],
  },
];

export const projects: Project[] = [
  { id: '1', name: 'Website Redesign', progress: 72, color: '#6366f1', tasks: 24, completed: 17 },
  { id: '2', name: 'Mobile App v2', progress: 45, color: '#f59e0b', tasks: 32, completed: 14 },
  { id: '3', name: 'API Integration', progress: 89, color: '#10b981', tasks: 18, completed: 16 },
  { id: '4', name: 'Marketing Campaign', progress: 30, color: '#ef4444', tasks: 12, completed: 4 },
];

export const weeklyData: ChartData[] = [
  { name: 'Lun', tasks: 12, completed: 8 },
  { name: 'Mar', tasks: 15, completed: 12 },
  { name: 'Mié', tasks: 10, completed: 9 },
  { name: 'Jue', tasks: 18, completed: 14 },
  { name: 'Vie', tasks: 14, completed: 11 },
  { name: 'Sáb', tasks: 8, completed: 7 },
  { name: 'Dom', tasks: 5, completed: 5 },
];

export const monthlyData: ChartData[] = [
  { name: 'Ene', tasks: 45, completed: 38 },
  { name: 'Feb', tasks: 52, completed: 44 },
  { name: 'Mar', tasks: 48, completed: 42 },
  { name: 'Abr', tasks: 61, completed: 55 },
  { name: 'May', tasks: 55, completed: 50 },
  { name: 'Jun', tasks: 67, completed: 58 },
];

export const activities: Activity[] = [
  { id: '1', action: 'Completó tarea', project: 'Website Redesign', time: 'Hace 5 min', type: 'complete' },
  { id: '2', action: 'Creó nuevo proyecto', project: 'Marketing Campaign', time: 'Hace 1 hora', type: 'create' },
  { id: '3', action: 'Añadió comentario', project: 'Mobile App v2', time: 'Hace 2 horas', type: 'comment' },
  { id: '4', action: 'Actualizó tarea', project: 'API Integration', time: 'Hace 3 horas', type: 'update' },
  { id: '5', action: 'Completó tarea', project: 'Website Redesign', time: 'Hace 4 horas', type: 'complete' },
  { id: '6', action: 'Creó tarea', project: 'Mobile App v2', time: 'Hace 5 horas', type: 'create' },
];
