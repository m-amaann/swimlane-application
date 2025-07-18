import React, { useRef, useEffect, useState } from 'react';
import { Badge, Typography } from 'antd';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types';
import TaskCard from './TaskCard';

const { Title } = Typography;

interface SwimlaneProps {
    id: TaskStatus;
    title: string;
    tasks: Task[];
    count: number;
    color: 'blue' | 'orange' | 'green' | 'red';
}

const Swimlane: React.FC<SwimlaneProps> = ({ id, title, tasks, count, color }) => {
    const swimlaneRef = useRef<HTMLDivElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const [swimlaneHeight, setSwimlaneHeight] = useState(0);
    const [isScrollable, setIsScrollable] = useState(false);

    const { isOver, setNodeRef } = useDroppable({ id });

    // Measure swimlane height and detect scrollable content
    useEffect(() => {
        if (dropZoneRef.current) {
            const { scrollHeight, clientHeight } = dropZoneRef.current;
            setSwimlaneHeight(scrollHeight);
            setIsScrollable(scrollHeight > clientHeight);
        }
    }, [tasks]);

    // Auto-scroll to bottom when new tasks are added
    useEffect(() => {
        if (dropZoneRef.current && tasks.length > 0) {
            const lastTask = tasks[tasks.length - 1];
            const lastTaskElement = dropZoneRef.current.querySelector(`[data-task-id="${lastTask.id}"]`);

            if (lastTaskElement) {
                lastTaskElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        }
    }, [tasks, tasks.length]);

    // Handle drop visual feedback
    useEffect(() => {
        if (dropZoneRef.current) {
            if (isOver) {
                dropZoneRef.current.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                dropZoneRef.current.style.borderColor = '#3b82f6';
                dropZoneRef.current.style.borderStyle = 'dashed';
                dropZoneRef.current.style.borderWidth = '2px';
            } else {
                dropZoneRef.current.style.backgroundColor = '';
                dropZoneRef.current.style.borderColor = '';
                dropZoneRef.current.style.borderStyle = '';
                dropZoneRef.current.style.borderWidth = '';
            }
        }
    }, [isOver]);

    // Scroll to top function
    const scrollToTop = () => {
        if (dropZoneRef.current) {
            dropZoneRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getBadgeColor = (color: string): string => {
        const colors = {
            blue: '#1890ff',
            orange: '#fa8c16',
            green: '#52c41a',
            red: '#f5222d',
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div
            ref={swimlaneRef}
            className="swimlane-container w-80 flex-shrink-0"
            data-swimlane-id={id}
        >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <Title level={4} className="!mb-0 !text-base font-medium text-gray-900">
                    {title}
                </Title>
                <div className="flex items-center gap-2">
                    <Badge
                        count={count}
                        style={{
                            backgroundColor: getBadgeColor(color),
                            color: 'white'
                        }}
                        className="font-medium"
                    />
                    {isScrollable && (
                        <button
                            onClick={scrollToTop}
                            className="text-xs text-gray-500 hover:text-gray-700 p-1 rounded"
                            title="Scroll to top"
                        >
                            ↑
                        </button>
                    )}
                </div>
            </div>

            <div
                ref={(node) => {
                    setNodeRef(node);
                    if (node) {
                        dropZoneRef.current = node;
                    }
                }}
                className="flex-1 transition-all duration-200 rounded-lg p-2 min-h-[500px] max-h-[600px] overflow-y-auto scrollbar-thin"
                style={{
                    background: isOver ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                }}
            >
                <SortableContext
                    items={tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}

                    {/* Empty state */}
                    {tasks.length === 0 && (
                        <div className="text-center text-gray-400 mt-8">
                            <div className="text-2xl mb-2">📝</div>
                            <div className="text-sm">Drop tasks here</div>
                        </div>
                    )}
                </SortableContext>

                {/* Debug info for development */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-50 rounded">
                        Height: {swimlaneHeight}px | Scrollable: {isScrollable ? 'Yes' : 'No'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Swimlane;