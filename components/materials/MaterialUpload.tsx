'use client';

import { useState, useRef } from 'react';

interface MaterialUploadProps {
  onUpload: (files: FileList) => void;
}

export default function MaterialUpload({ onUpload }: MaterialUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      // 重置文件输入，以便可以再次选择相同的文件
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mb-2">拖放文件到这里，或者</p>
        <button 
          type="button"
          className="btn-primary px-4 py-2 text-sm"
          onClick={handleBrowseClick}
        >
          浏览文件
        </button>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          multiple 
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-500 mt-2">
          支持PDF、Word文档、PPT、视频等多种格式
        </p>
      </div>
    </div>
  );
}