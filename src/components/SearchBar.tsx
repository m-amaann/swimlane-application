import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useTaskStore from '@/state/taskStore';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTaskStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Input
      placeholder="Search tasks..."
      prefix={<SearchOutlined className="text-gray-400" />}
      value={searchQuery}
      onChange={handleSearchChange}
      className="w-full"
      size="middle"
      allowClear
    />
  );
};

export default SearchBar;