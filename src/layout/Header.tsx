import React from 'react';
import { Layout, Space, Button, Avatar, Badge } from 'antd';
import { BellOutlined, SettingOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';
import SearchBar from '@/components/SearchBar';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
    return (
        <AntHeader className="bg-white shadow-sm border-b border-gray-200 px-6 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="font-semibold text-gray-900">Board App</span>
                </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
                <SearchBar />
            </div>

            <Space size="middle">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Create new board
                </Button>

                <Badge count={5} size="small">
                    <Button
                        type="text"
                        icon={<BellOutlined />}
                        className="text-gray-500 hover:text-gray-700"
                    />
                </Badge>

                <Button
                    type="text"
                    icon={<SettingOutlined />}
                    className="text-gray-500 hover:text-gray-700"
                />

                <Avatar
                    icon={<TeamOutlined />}
                    className="bg-gray-300"
                />
            </Space>
        </AntHeader>
    );
};

export default Header;