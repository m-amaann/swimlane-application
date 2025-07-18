import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Task, TaskStatus, DragDropHandlers } from '@/types';
import { getColumnColor } from '@/utils/storage';
import TaskCard from './TaskCard';

interface SwimlaneProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
  dragDropHandlers: DragDropHandlers;
  isDragOver: boolean;
  draggedTask: Task | null;
  className?: string;
}

const Swimlane: React.FC<SwimlaneProps> = React.memo(({
  id,
  title,
  tasks,
  color,
  dragDropHandlers,
  isDragOver,
  draggedTask,
  className = ""
}) => {
  const {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = dragDropHandlers;

  return (
    <div 
      className={`
        bg-gray-50 rounded-2xl p-4 w-80 flex-shrink-0 
        transition-all duration-300 ease-out border-2 border-transparent
        ${isDragOver ? 'bg-blue-50 border-blue-400 border-dashed scale-[1.02] shadow-lg' : ''}
        ${className}
      `}
      onDragOver={(e) => handleDragOver(e, id)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, id)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getColumnColor(color)}`}></div>
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all">
            <Plus size={14} className="text-gray-500" />
          </button>
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all">
            <MoreHorizontal size={14} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Drop Zone Indicator */}
      {isDragOver && (
        <div className="mb-4 p-3 border-2 border-blue-400 border-dashed rounded-xl bg-blue-100 text-blue-600 text-center text-sm font-medium">
          Drop task here to move to {title}
        </div>
      )}

      {/* Tasks Container */}
      <div className="space-y-0 min-h-[400px]">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={handleDragStart }
            onDragEnd={handleDragEnd}
            isDragged={draggedTask?.id === task.id}
          />
        ))}
        
        {/* Empty State */}
        {tasks.length === 0 && !isDragOver && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Plus size={20} />
            </div>
            <p className="text-sm font-medium">No tasks yet</p>
            <p className="text-xs">Drop tasks here or create new ones</p>
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-white transition-all text-sm font-medium">
        <Plus size={16} className="inline mr-2" />
        Add Task
      </button>
    </div>
  );
});

Swimlane.displayName = 'Swimlane';

export default Swimlane;