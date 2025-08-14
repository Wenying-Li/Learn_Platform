'use client';

import { useState } from 'react';

interface MaterialSearchFormProps {
  onSearch: (searchTerm: string) => void;
  isSearching: boolean;
}

export default function MaterialSearchForm({ onSearch, isSearching }: MaterialSearchFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [urlInput, setUrlInput] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onSearch(urlInput.trim());
      setUrlInput('');
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">关键词搜索</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            className="input-field flex-grow"
            placeholder="输入关键词搜索学习资料..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary whitespace-nowrap"
            disabled={isSearching || !searchTerm.trim()}
          >
            {isSearching ? '搜索中...' : '搜索'}
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">添加网址</h3>
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            className="input-field flex-grow"
            placeholder="输入网址添加资料..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary whitespace-nowrap"
            disabled={isSearching || !urlInput.trim()}
          >
            添加
          </button>
        </form>
      </div>
    </div>
  );
}