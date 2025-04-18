import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    'Vietnamese', 
    'Spanish', 
    'French', 
    'German', 
    'Japanese', 
    'Korean', 
    'Chinese'
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (language: string) => {
    onSelect(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center text-white hover:bg-gray-700 py-1 px-2 rounded-md transition-colors"
        onClick={toggleDropdown}
      >
        <span>{selectedLanguage}</span>
        {isOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-gray-700 rounded-md shadow-lg py-1 w-40 max-h-60 overflow-auto">
          {languages.map(language => (
            <button
              key={language}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === selectedLanguage 
                  ? 'bg-gray-600 text-white' 
                  : 'text-gray-200 hover:bg-gray-600'
              } transition-colors`}
              onClick={() => handleSelect(language)}
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;