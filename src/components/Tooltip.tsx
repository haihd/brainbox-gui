import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  text, 
  children, 
  position = 'top',
  delay = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2'
  };

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div 
          className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg 
                    transition-opacity duration-200 opacity-100 whitespace-nowrap ${positionClasses[position]}`}
          role="tooltip"
        >
          {text}
          <div 
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45
                      ${position === 'top' ? 'top-full -translate-y-1/2 left-1/2 -translate-x-1/2' : ''}
                      ${position === 'bottom' ? 'bottom-full translate-y-1/2 left-1/2 -translate-x-1/2' : ''}
                      ${position === 'left' ? 'left-full -translate-x-1/2 top-1/2 -translate-y-1/2' : ''}
                      ${position === 'right' ? 'right-full translate-x-1/2 top-1/2 -translate-y-1/2' : ''}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;