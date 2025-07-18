import React from 'react';
import { Calendar, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Task } from '@/types';
import { formatDate, getPriorityColor } from '@/utils/storage';

interface TaskCardProps {
    task: Task;
    onDragStart: (e: React.DragEvent, task: Task, status: string) => void;
    onDragEnd: (e: React.DragEvent) => void;
    isDragged?: boolean;
    className?: string;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({
    task,
    onDragStart,
    onDragEnd,
    isDragged = false,
    className = ""
}) => {
    return (
        <div
            className={`
        bg-white rounded-xl p-4 mb-3 border border-gray-200 
        transition-all duration-200 cursor-move group select-none
        hover:shadow-lg hover:border-gray-300 hover:-translate-y-1
        active:scale-105 active:rotate-2
        ${isDragged ? 'opacity-50 scale-105 rotate-2 shadow-2xl z-50' : 'shadow-sm'}
        ${className}
      `}
            style=
            {{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }}
            draggable="true"
            onDragStart={(e) => onDragStart(e, task, task.status)}
            onDragEnd={onDragEnd}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={14} className="text-gray-400" />
                </button>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                {task.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                {task.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
                {task.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(task.dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        <span>{task.comments}</span>
                    </div>
                </div>

                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {task.assignee.avatar}
                </div>
            </div>
        </div>
    );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;