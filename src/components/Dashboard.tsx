import React, { useRef, useEffect, useState } from 'react';
import { Layout, Typography, ConfigProvider, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column, TaskStatus, DragEndEvent } from '@/types';
import useTaskStore from '@/state/taskStore';
import Header from '@/layout/Header';
import Swimlane from './Swimlane';

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
    const { tasks, getTasksByStatus, updateTaskStatus } = useTaskStore();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columns: Column[] = [
        { id: 'todo', title: 'To Do', color: 'blue' },
        { id: 'inprogress', title: 'In Progress', color: 'orange' },
        { id: 'approved', title: 'Approved', color: 'green' },
        { id: 'reject', title: 'Reject', color: 'red' },
    ];

    // Check scroll position and update navigation buttons
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // Measure container dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (dashboardRef.current) {
                const { offsetWidth, offsetHeight } = dashboardRef.current;
                setContainerDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Setup scroll event listener
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition(); // Initial check

            return () => {
                scrollContainer.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, []);

    // Scroll navigation functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320, // Swimlane width + gap
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320, // Swimlane width + gap
                behavior: 'smooth'
            });
        }
    };

    // Auto-scroll to specific column
    const scrollToColumn = (columnId: TaskStatus) => {
        if (scrollContainerRef.current) {
            const columnElement = scrollContainerRef.current.querySelector(`[data-swimlane-id="${columnId}"]`);
            if (columnElement) {
                columnElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            // Navigate columns with arrow keys when Alt is pressed
            if (event.altKey) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scrollLeft();
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scrollRight();
                }
            }

            // Quick column navigation with numbers
            if (event.ctrlKey || event.metaKey) {
                const columnMap: { [key: string]: TaskStatus } = {
                    '1': 'todo',
                    '2': 'inprogress',
                    '3': 'approved',
                    '4': 'reject'
                };

                if (columnMap[event.key]) {
                    event.preventDefault();
                    scrollToColumn(columnMap[event.key]);
                }
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeTask = tasks.find(task => task.id === active.id);
        const overColumn = columns.find(col => col.id === over.id);

        if (overColumn && activeTask && activeTask.status !== overColumn.id) {
            updateTaskStatus(active.id, overColumn.id);

            // Auto-scroll to destination column after drop
            setTimeout(() => {
                scrollToColumn(overColumn.id);
            }, 100);
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 8 } }}>
            <Layout className="min-h-screen bg-gray-100" ref={dashboardRef}>
                <Header />
                <Content className="px-6 py-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Title level={2} className="!mb-2 text-gray-900">
                                    Sport XI Project
                                </Title>
                                <Text className="text-gray-600">
                                    Sport project management dashboard
                                </Text>
                            </div>

                            {/* Scroll navigation buttons */}
                            <div className="flex items-center gap-2">
                                <Button
                                    type="text"
                                    icon={<LeftOutlined />}
                                    onClick={scrollLeft}
                                    disabled={!canScrollLeft}
                                    className="text-gray-500"
                                    title="Scroll left (Alt + ←)"
                                />
                                <Button
                                    type="text"
                                    icon={<RightOutlined />}
                                    onClick={scrollRight}
                                    disabled={!canScrollRight}
                                    className="text-gray-500"
                                    title="Scroll right (Alt + →)"
                                />
                            </div>
                        </div>

                        {/* Quick navigation hints */}
                        <div className="text-xs text-gray-400 mt-2">
                            Navigate: Alt + ← → | Jump to columns: ⌘ + 1-4
                        </div>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <div
                            ref={scrollContainerRef}
                            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-thin"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {columns.map((column, index) => {
                                const columnTasks = getTasksByStatus(column.id);
                                return (
                                    <Swimlane
                                        key={column.id}
                                        id={column.id}
                                        title={column.title}
                                        tasks={columnTasks}
                                        count={columnTasks.length}
                                        color={column.color}
                                    />
                                );
                            })}
                        </div>
                    </DndContext>

                    {/* Dashboard stats for development */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-sm text-gray-600">
                                <div>Container: {containerDimensions.width}x{containerDimensions.height}px</div>
                                <div>Can scroll: Left {canScrollLeft ? '✓' : '✗'} | Right {canScrollRight ? '✓' : '✗'}</div>
                                <div>Total tasks: {tasks.length}</div>
                            </div>
                        </div>
                    )}
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default Dashboard;