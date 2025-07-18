import { useState, useCallback, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus, TaskStore } from '@/types';
import { storage } from '@/utils/storage';
import tasksData from '@/data/tasks.json';

export const useTaskStore = (): TaskStore => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        // Load from localStorage
    if (typeof window !== 'undefined') {
        const saved = storage.get<Task[]>('swimlane-tasks');
        if (saved) return saved;
    }
    
        // Ensure status is cast to TaskStatus
    // Ensure status is cast to TaskStatus
    return tasksData.tasks.map(task => ({
        ...task,
        status: task.status as TaskStatus,
        priority: task.priority as TaskPriority // Add this line
    }));
    });

    const [searchQuery, setSearchQuery] = useState('');

    // Save to localStorage whenever tasks change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            storage.set('swimlane-tasks', tasks);
        }
    }, [tasks]);

    const getFilteredTasks = useCallback(() => {
        if (!searchQuery) return tasks;

        const query = searchQuery.toLowerCase();
        return tasks.filter(task =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query) ||
            task.tags.some(tag => tag.toLowerCase().includes(query)) ||
            task.assignee.name.toLowerCase().includes(query)
        );
    }, [tasks, searchQuery]);

    const updateTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    }, []);

    const getTasksByStatus = useCallback((status: TaskStatus) => {
        return getFilteredTasks().filter(task => task.status === status);
    }, [getFilteredTasks]);

    const resetTasks = useCallback(() => {
        setTasks(prev => prev.map(task => ({
            ...task,
            status: task.status as TaskStatus
        })));
        setSearchQuery('');
    }, []);

    return {
        tasks,
        searchQuery,
        setSearchQuery,
        getFilteredTasks,
        updateTaskStatus,
        getTasksByStatus,
        resetTasks
    };
};

export default useTaskStore;