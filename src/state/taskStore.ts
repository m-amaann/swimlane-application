import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, TaskStatus, TaskStore } from '@/types';
import tasksData from '@/data/tasks.json';

const useTaskStore = create<TaskStore>()(
    persist(
        (set, get) => ({
            tasks: tasksData.tasks as Task[],
            searchQuery: '',

            setSearchQuery: (query: string) => set({ searchQuery: query }),

            getFilteredTasks: (): Task[] => {
                const { tasks, searchQuery } = get();
                if (!searchQuery) return tasks;

                const query = searchQuery.toLowerCase();

                // Filter tasks based on search query in title, description, tags, and assignee name
                return tasks.filter(task =>
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query) ||
                    task.tags.some(tag => tag.toLowerCase().includes(query)) ||
                    task.assignee.name.toLowerCase().includes(query)
                );
            },

            updateTaskStatus: (taskId: string, newStatus: TaskStatus) => {
                set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    )
                }));
            },

            reorderTasks: (tasks: Task[]) => {
                set({ tasks });
            },

            // Retrieves tasks
            getTasksByStatus: (status: TaskStatus): Task[] => {
                const filteredTasks = get().getFilteredTasks();
                return filteredTasks.filter(task => task.status === status);
            },

            // Resets tasks and clears the search query
            resetTasks: () => set({
                tasks: tasksData.tasks as Task[],
                searchQuery: ''
            }),
        }),

        // Store name for localStorage
        {
            name: 'task-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useTaskStore;