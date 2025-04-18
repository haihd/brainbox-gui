import React, { useState, useRef, useEffect } from 'react';
import { PinIcon, Pin } from 'lucide-react';

interface DropdownItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  pinned?: boolean;
  onClick?: () => void;
  onPinChange?: (pinned: boolean) => void;
}

interface DropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  isOpen,
  onClose,
  position = 'left',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item: DropdownItem) => {
    setActiveItem(item.id);
    setTimeout(() => {
      setActiveItem(null);
      if (item.onClick) item.onClick();
      onClose();
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-50 mt-2 ${
        position === 'left' ? 'right-0' : 'left-0'
      } bg-gray-800 rounded-md shadow-lg py-1 min-w-64 animate-fadeIn`}
      style={{
        transformOrigin: 'top right',
        animation: 'scaleIn 0.15s ease-out forwards',
      }}
    >
      <div className="overflow-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-indigo-900/50 transition-colors group ${
              activeItem === item.id ? 'bg-indigo-900/50 scale-95' : ''
            }`}
          >
            <button
              onClick={() => handleItemClick(item)}
              className="flex items-center flex-1 active:scale-95 transition-transform"
            >
              <span className="mr-3 text-gray-400">{item.icon}</span>
              <span>{item.label}</span>
            </button>
            {item.onPinChange && (
              <button
                onClick={() => item.onPinChange?.(!item.pinned)}
                className="ml-2 text-gray-400 hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity active:scale-95"
              >
                {item.pinned ? <Pin size={16} /> : <PinIcon size={16} />}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
