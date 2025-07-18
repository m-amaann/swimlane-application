export interface Task 
{
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


export interface Assignee 
{
  name: string;
  avatar: string;
}


export interface Column 
{
  id: TaskStatus;
  title: string;
  color: 'blue' | 'orange' | 'green' | 'red';
}


export interface TaskStore 
{
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getFilteredTasks: () => Task[];
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  reorderTasks: (tasks: Task[]) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  resetTasks: () => void;
}


export interface DragEndEvent 
{
  active: { id: string };
  over: { id: string } | null;
}