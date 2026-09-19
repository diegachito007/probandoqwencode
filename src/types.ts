export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  color: string;
  tasks: number;
  completed: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

export interface ChartData {
  name: string;
  tasks: number;
  completed: number;
}

export interface Activity {
  id: string;
  action: string;
  project: string;
  time: string;
  type: 'create' | 'complete' | 'comment' | 'update';
}
