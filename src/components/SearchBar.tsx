import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useTaskStore from '@/state/taskStore';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <Input
      placeholder="Search tasks..."
      prefix={<SearchOutlined className="text-gray-400" />}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full"
      size="middle"
    />
  );
};

export default SearchBar;
