interface MaterialListProps {
  materials: any[];
  onSelect?: (material: any) => void;
  onRemove?: (id: string) => void;
  selectable?: boolean;
  removable?: boolean;
}

export default function MaterialList({ 
  materials, 
  onSelect, 
  onRemove,
  selectable = false,
  removable = false 
}: MaterialListProps) {
  
  // 渲染资料类型图标
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'website':
      case 'text/html':
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'pdf':
      case 'application/pdf':
        return (
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'video':
      case 'video/mp4':
        return (
          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'documentation':
      case 'text/plain':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };
  
  return (
    <ul className="space-y-3">
      {materials.map(material => (
        <li 
          key={material.id} 
          className={`p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${
            selectable ? 'hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer' : ''
          } transition-colors flex items-start`}
          onClick={selectable ? () => onSelect(material) : undefined}
        >
          <div className="mr-3 mt-1">
            {renderTypeIcon(material.type)}
          </div>
          <div className="flex-grow">
            <h3 className="font-medium">{material.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{material.description}</p>
            {material.url && (
              <a 
                href={material.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                {material.url}
              </a>
            )}
            {material.uploadDate && (
              <p className="text-xs text-gray-500 mt-1">
                上传于: {new Date(material.uploadDate).toLocaleString()}
              </p>
            )}
          </div>
          {removable && onRemove && (
            <button 
              className="text-red-500 hover:text-red-700 ml-2 p-1" 
              onClick={(e) => {
                e.stopPropagation();
                onRemove(material.id);
              }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </li>
      ))}
      {materials.length === 0 && (
        <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-500">
          没有找到资料
        </li>
      )}
    </ul>
  );
}