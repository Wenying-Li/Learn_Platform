'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MaterialSearchForm from '@/components/materials/MaterialSearchForm';
import MaterialList from '@/components/materials/MaterialList';
import MaterialUpload from '@/components/materials/MaterialUpload';
import MaterialOutline from '@/components/materials/MaterialOutline';
import { callAgent } from '@/lib/ai-agents';

export default function MaterialsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedMaterials, setSavedMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [generatedOutline, setGeneratedOutline] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 加载已保存的材料
  useEffect(() => {
    // 模拟从本地存储加载数据
    const savedData = localStorage.getItem('savedMaterials');
    if (savedData) {
      setSavedMaterials(JSON.parse(savedData));
    }
  }, []);

  // 保存选中的材料
  const saveSelectedMaterials = () => {
    const newSavedList = [...savedMaterials, ...selectedMaterials];
    setSavedMaterials(newSavedList);
    setSelectedMaterials([]);
    // 保存到本地存储
    localStorage.setItem('savedMaterials', JSON.stringify(newSavedList));
  };

  // 执行实际的网络搜索
  const handleSearch = async (searchTerm) => {
    if (!searchTerm) return;
    
    setIsSearching(true);
    
    try {
      // 从专业领域中获取学习主题
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const topic = userProfile.topic || 'frontend';
      
      // 调用AI智能体执行搜索
      const response = await callAgent(topic, {
        action: 'searchMaterials',
        searchTerm,
      });
      
      setSearchResults(response.results || []);
    } catch (error) {
      console.error('搜索失败:', error);
      // 模拟搜索结果
      setSearchResults([
        {
          id: `result-${Date.now()}-1`,
          title: `${searchTerm} - MDN Web 文档`,
          description: '权威的Web开发文档',
          url: 'https://developer.mozilla.org/',
          type: 'website'
        },
        {
          id: `result-${Date.now()}-2`,
          title: `${searchTerm} 实践教程`,
          description: '通过实例学习相关技能',
          url: 'https://example.com/tutorial',
          type: 'tutorial'
        },
        {
          id: `result-${Date.now()}-3`,
          title: `${searchTerm} API参考`,
          description: '完整的API参考文档',
          url: 'https://example.com/api',
          type: 'documentation'
        }
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  // 上传文件处理
  const handleFileUpload = (files) => {
    // 处理文件上传
    const uploadedFiles = Array.from(files).map(file => ({
      id: `file-${Date.now()}-${file.name}`,
      title: file.name,
      description: `上传的文件 (${(file.size / 1024).toFixed(2)} KB)`,
      type: file.type,
      file: file,
      uploadDate: new Date().toISOString()
    }));
    
    setSelectedMaterials([...selectedMaterials, ...uploadedFiles]);
  };

  // 选择搜索结果
  const handleSelectResult = (result) => {
    if (!selectedMaterials.some(item => item.id === result.id)) {
      setSelectedMaterials([...selectedMaterials, result]);
    }
  };

  // 生成学习大纲
  const generateOutline = async () => {
    if (savedMaterials.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      // 获取用户学习主题
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const topic = userProfile.topic || 'frontend';
      
      // 调用AI智能体生成大纲
      const response = await callAgent(topic, {
        action: 'generateOutline',
        materials: savedMaterials,
      });
      
      if (response.outline) {
        setGeneratedOutline(response.outline);
        
        // 保存大纲到本地存储
        localStorage.setItem('learningOutline', JSON.stringify(response.outline));
      }
    } catch (error) {
      console.error('生成大纲失败:', error);
      
      // 模拟生成的大纲
      const outline = {
        title: "前端开发学习大纲",
        description: "基于收集的材料生成的学习路径",
        sections: [
          {
            title: "基础知识",
            topics: ["HTML基础", "CSS基础", "JavaScript基础"]
          },
          {
            title: "进阶概念",
            topics: ["DOM操作", "事件处理", "异步编程"]
          },
          {
            title: "框架应用",
            topics: ["React基础", "组件开发", "状态管理"]
          }
        ],
        estimatedTime: "6周",
        difficulty: "中级"
      };
      
      setGeneratedOutline(outline);
      localStorage.setItem('learningOutline', JSON.stringify(outline));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">学习资料收集</h1>
        <p className="text-gray-600 dark:text-gray-300">
          搜索、上传和组织您的学习资料，生成学习大纲
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">搜索学习资料</h2>
            <MaterialSearchForm onSearch={handleSearch} isSearching={isSearching} />
            
            {searchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">搜索结果</h3>
                <MaterialList 
                  materials={searchResults} 
                  onSelect={handleSelectResult}
                  selectable={true}
                />
              </div>
            )}
          </div>
          
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">上传学习资料</h2>
            <MaterialUpload onUpload={handleFileUpload} />
          </div>
          
          {selectedMaterials.length > 0 && (
            <div className="card mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">已选择的资料 ({selectedMaterials.length})</h2>
                <button 
                  className="btn-primary"
                  onClick={saveSelectedMaterials}
                >
                  保存所选资料
                </button>
              </div>
              <MaterialList 
                materials={selectedMaterials} 
                onRemove={(id) => setSelectedMaterials(selectedMaterials.filter(item => item.id !== id))}
                removable={true}
              />
            </div>
          )}
          
          {savedMaterials.length > 0 && (
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">已保存的资料 ({savedMaterials.length})</h2>
                <button 
                  className="btn-primary"
                  onClick={generateOutline}
                  disabled={isGenerating}
                >
                  {isGenerating ? '正在生成...' : '生成学习大纲'}
                </button>
              </div>
              <MaterialList 
                materials={savedMaterials} 
                onRemove={(id) => {
                  const updatedMaterials = savedMaterials.filter(item => item.id !== id);
                  setSavedMaterials(updatedMaterials);
                  localStorage.setItem('savedMaterials', JSON.stringify(updatedMaterials));
                }}
                removable={true}
              />
            </div>
          )}
        </div>
        
        <div>
          <div className="card sticky top-6">
            <h2 className="text-lg font-bold mb-4">学习大纲</h2>
            {generatedOutline ? (
              <MaterialOutline outline={generatedOutline} />
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p>添加学习资料并点击"生成学习大纲"按钮</p>
                <p className="text-sm text-gray-500 mt-2">大纲将基于您的学习目标和收集的资料生成</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}