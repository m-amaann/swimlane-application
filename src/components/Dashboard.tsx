import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Column, TaskStatus } from '@/types';
import { useTaskStore } from '@/state/taskStore';
import { useDragDrop } from '../utils/dragDrop';
import Swimlane from './Swimlane';

interface DashboardProps {
  onNotification?: (message: string) => void;
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  onNotification,
  className = ""
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { getTasksByStatus, updateTaskStatus } = useTaskStore();
  
  const {
    draggedTask,
    dragOverColumn,
    dragDropHandlers
  } = useDragDrop((taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus) => {
    updateTaskStatus(taskId, toStatus);
    
    if (onNotification) {
      const columnNames = {
        todo: 'To Do',
        inprogress: 'In Progress', 
        approved: 'Approved',
        reject: 'Reject'
      };
      onNotification(`Task moved to ${columnNames[toStatus]}`);
    }
  });

  const columns: Column[] = [
    { id: 'todo', title: 'To Do', color: 'blue' },
    { id: 'inprogress', title: 'In Progress', color: 'orange' },
    { id: 'approved', title: 'Approved', color: 'green' },
    { id: 'reject', title: 'Reject', color: 'red' },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex-1 overflow-hidden p-4 md:p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Tasks</h2>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-lg">
            <span>💡 Drag tasks between columns to change status</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} className="text-gray-500" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Swimlanes */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-300px)]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {columns.map(column => (
          <Swimlane
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={getTasksByStatus(column.id)}
            color={column.color}
            dragDropHandlers={dragDropHandlers}
            isDragOver={dragOverColumn === column.id}
            draggedTask={draggedTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;