import React, { useState } from 'react';
import { X, Copy, Volume2, Maximize2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface TranslationCardProps {
  initialLanguage?: string;
  initialText?: string;
  initialTranslation?: string;
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  initialLanguage = 'Vietnamese',
  initialText = 'Ơi chao',
  initialTranslation = 'Sử dụng để diễn tả sự nhẹ nhõm hoặc cảm giác thở phào sau một tình huống căng thẳng, như khi đội Warriors đã giành chiến thắng.'
}) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(initialTranslation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playAudio = () => {
    // In a real app, this would trigger the pronunciation audio
    console.log('Playing pronunciation audio');
  };

  return (
    <div>
      <div className="max-w-md bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-white text-lg font-medium mr-2">Translate</h2>
              <LanguageSelector 
                selectedLanguage={language} 
                onSelect={setLanguage} 
              />
            </div>
            <div className="flex space-x-1">
              <button className="text-gray-400 hover:text-white transition-colors p-1">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Source Text */}
          <div className="mb-4">
            <p className="text-white text-xl font-medium">{initialText}</p>
            <p className="text-gray-400 text-sm mt-1">{initialTranslation}</p>
          </div>

          {/* Pronunciation */}
          <div className="bg-gray-700/50 rounded-md p-3 mb-4">
            <div className="flex items-center mb-2">
              <span className="text-white mr-2">Phew</span>
              <span className="text-gray-400 text-sm">/pju:/</span>
              <button 
                className="ml-2 text-gray-400 hover:text-white transition-colors"
                onClick={playAudio}
              >
                <Volume2 size={16} />
              </button>
            </div>
            
            {/* Part of Speech */}
            <div>
              <div className="text-indigo-400 text-sm border-l-2 border-indigo-400 pl-2 mb-1">
                Thán từ
              </div>
              <p className="text-gray-300 text-sm">
                Diễn tả sự nhẹ nhõm, thường là sau một trải nghiệm căng thẳng.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center">
            <button className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
              <span className="mr-1">Continue in Chat</span>
            </button>
            <div className="flex space-x-3">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Maximize2 size={18} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors" onClick={playAudio}>
                <Volume2 size={18} />
              </button>
              <button 
                className={`flex items-center ${copied ? 'text-green-400' : 'text-gray-400 hover:text-white'} transition-colors`}
                onClick={handleCopy}
              >
                <Copy size={18} />
                <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationCard;