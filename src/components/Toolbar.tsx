import React, { useState } from 'react';
import { 
  Copy, 
  Highlighter, 
  Headphones, 
  PencilRuler, 
  BookOpen, 
  Languages, 
  FileText, 
  HelpCircle,
  MonitorSmartphone,
  MoreVertical
} from 'lucide-react';
import Tooltip from './Tooltip';
import Dropdown from './Dropdown';

interface ToolbarProps {
  className?: string;
  onTranslate?: () => void;
}

interface ToolItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  pinned: boolean;
  onClick?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ className = '', onTranslate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items, setItems] = useState<ToolItem[]>([
    { 
      id: 'copy', 
      label: 'Copy', 
      icon: <Copy size={18} />, 
      pinned: true,
      onClick: () => console.log('Copy clicked') 
    },
    { 
      id: 'highlight', 
      label: 'Highlight', 
      icon: <Highlighter size={18} />, 
      pinned: false
    },
    { 
      id: 'read-aloud', 
      label: 'Read aloud', 
      icon: <Headphones size={18} />, 
      pinned: true
    },
    { 
      id: 'review', 
      label: 'Review it', 
      icon: <PencilRuler size={18} />,
      pinned: false
    },
    { 
      id: 'explain', 
      label: 'Explain', 
      icon: <BookOpen size={18} />, 
      pinned: false
    },
    { 
      id: 'translate', 
      label: 'Translate into: Vietnamese', 
      icon: <Languages size={18} />, 
      pinned: false,
      onClick: onTranslate
    },
    { 
      id: 'summarize', 
      label: 'Summarize', 
      icon: <FileText size={18} />,
      pinned: false
    },
    { 
      id: 'answer', 
      label: 'Answer this question', 
      icon: <HelpCircle size={18} />,
      pinned: false
    },
    { 
      id: 'sider', 
      label: 'Sider Fusion', 
      icon: <MonitorSmartphone size={18} />,
      pinned: true
    }
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handlePinChange = (id: string, pinned: boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, pinned } : item
    ));
  };

  const pinnedItems = items.filter(item => item.pinned);
  const dropdownItems = items.map(item => ({
    ...item,
    onPinChange: (pinned: boolean) => handlePinChange(item.id, pinned)
  }));

  return (
    <div className={`flex items-center rounded-full bg-gray-800 px-3 py-2 shadow-md ${className}`}>
      <Tooltip text="Avatar">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs mr-2">
          SB
        </div>
      </Tooltip>
      
      {pinnedItems.map(item => (
        <Tooltip key={item.id} text={item.label}>
          <button 
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={item.onClick}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
      
      <div className="h-5 w-px bg-gray-600 mx-1"></div>
      
      <div className="relative">
        <Tooltip text={isDropdownOpen ? "Close menu" : "More options"}>
          <button 
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={toggleDropdown}
          >
            <MoreVertical size={18} />
          </button>
        </Tooltip>
        
        <Dropdown 
          items={dropdownItems} 
          isOpen={isDropdownOpen} 
          onClose={closeDropdown}
        />
      </div>
      
      <Tooltip text="Close">
        <button className="ml-1 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};

export default Toolbar;