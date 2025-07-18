import { useState, useCallback } from 'react';
import { Task, TaskStatus, DragDropState, DragDropHandlers } from '@/types';

export const useDragDrop = (
  onTaskMove: (taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus) => void
): DragDropState & { dragDropHandlers: DragDropHandlers } => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<TaskStatus | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((e: React.DragEvent, task: Task, fromStatus: TaskStatus) => {
    setDraggedTask(task);
    setDraggedFrom(fromStatus);
    setIsDragging(true);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, fromStatus }));
    
    requestAnimationFrame(() => {
      (e.target as HTMLElement).style.opacity = '0.5';
      (e.target as HTMLElement).style.transform = 'rotate(2deg) scale(1.02)';
    });
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = '1';
    (e.target as HTMLElement).style.transform = '';
    
    setTimeout(() => {
      setDraggedTask(null);
      setDraggedFrom(null);
      setDragOverColumn(null);
      setIsDragging(false);
    }, 100);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, toStatus: TaskStatus) => {
    e.preventDefault();
    e.stopPropagation();
    
    const taskId = e.dataTransfer.getData('text/plain');
    let fromStatus = draggedFrom;
    
    try {
      const dragData = e.dataTransfer.getData('application/json');
      if (dragData) {
        const parsed = JSON.parse(dragData);
        fromStatus = parsed.fromStatus;
      }
    } catch (err) {
      console.log('Using state for fromStatus');
    }
    
    if (taskId && fromStatus && fromStatus !== toStatus) {
      onTaskMove(taskId, fromStatus, toStatus);
    }
    
    setDragOverColumn(null);
  }, [draggedTask, draggedFrom, onTaskMove]);

  return {
    draggedTask,
    isDragging,
    dragOverColumn,
    dragDropHandlers: {
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragLeave,
      handleDrop
    }
  };
};