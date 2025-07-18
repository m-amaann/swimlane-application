export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: Assignee;
  dueDate: string;
  comments: number;
  tags: string[];
}

export type TaskStatus = 'todo' | 'inprogress' | 'approved' | 'reject';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Assignee {
  name: string;
  avatar: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: 'blue' | 'orange' | 'green' | 'red';
}

export interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getFilteredTasks: () => Task[];
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  resetTasks: () => void;
}

export interface DragDropHandlers {
  handleDragStart: (e: React.DragEvent, task: Task, status: TaskStatus) => void;
  handleDragEnd: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent, status: TaskStatus) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

export interface DragDropState {
  draggedTask: Task | null;
  isDragging: boolean;
  dragOverColumn: TaskStatus | null;
}