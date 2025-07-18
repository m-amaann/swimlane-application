import React, { useRef, useEffect, useState } from 'react';
import { Card, Tag, Avatar, Space, Typography } from 'antd';
import {
    CalendarOutlined,
    MessageOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskPriority } from '@/types';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Measure card dimensions for animations
    useEffect(() => {
        if (cardRef.current) {
            const { offsetWidth, offsetHeight } = cardRef.current;
            setCardDimensions({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

    // Add custom drag visual effects
    useEffect(() => {
        if (isDragging && cardRef.current) {
            cardRef.current.style.transform = 'rotate(5deg) scale(1.05)';
            cardRef.current.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            cardRef.current.style.zIndex = '1000';
        } else if (cardRef.current) {
            cardRef.current.style.transform = '';
            cardRef.current.style.boxShadow = '';
            cardRef.current.style.zIndex = '';
        }
    }, [isDragging]);

    // Handle hover animations
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (cardRef.current && !isDragging) {
            cardRef.current.style.transform = 'translateY(-2px) scale(1.02)';
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (cardRef.current && !isDragging) {
            cardRef.current.style.transform = '';
        }
    };

    const getPriorityColor = (priority: TaskPriority): string => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'default';
        }
    };

    const getPriorityIcon = (priority: TaskPriority) => {
        switch (priority) {
            case 'high': return <ExclamationCircleOutlined />;
            case 'medium': return <ClockCircleOutlined />;
            case 'low': return <CheckCircleOutlined />;
            default: return null;
        }
    };

    return (
        <div
            ref={(node) => {
                setNodeRef(node);
                if (node) {
                    cardRef.current = node;
                }
            }}
            style={style}
            {...attributes}
            {...listeners}
            className={`task-card mb-3 ${isDragging ? 'opacity-50' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-task-id={task.id}
        >
            <Card
                size="small"
                className="shadow-sm hover:shadow-md transition-all duration-200"
                bodyStyle={{ padding: '12px' }}
            >
                <div className="flex items-start justify-between mb-2">
                    <Title level={5} className="!mb-0 !text-sm font-medium text-gray-900">
                        {task.title}
                    </Title>
                    <Tag
                        color={getPriorityColor(task.priority)}
                        icon={getPriorityIcon(task.priority)}
                        className="!ml-2"
                    >
                        {task.priority}
                    </Tag>
                </div>

                <Text className="text-gray-600 text-xs block mb-3 line-clamp-2">
                    {task.description}
                </Text>

                <div className="flex items-center justify-between mb-3">
                    <Space size="small" className="text-xs text-gray-500">
                        <Space size={2}>
                            <CalendarOutlined />
                            <span>{dayjs(task.dueDate).format('MMM DD')}</span>
                        </Space>
                        <Space size={2}>
                            <MessageOutlined />
                            <span>{task.comments}</span>
                        </Space>
                    </Space>

                    <Avatar
                        size="small"
                        className="bg-blue-500 text-white text-xs"
                    >
                        {task.assignee.avatar}
                    </Avatar>
                </div>

                <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                        <Tag
                            key={index}
                            color="blue"
                            className="!text-xs !px-2 !py-0 !text-blue-700 !bg-blue-50 !border-blue-200"
                        >
                            {tag}
                        </Tag>
                    ))}
                </div>

               
                {process.env.NODE_ENV === 'development' && isHovered && (
                    <div className="text-xs text-gray-400 mt-2">
                        {cardDimensions.width}x{cardDimensions.height}px
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TaskCard;