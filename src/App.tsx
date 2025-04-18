import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import TranslationCard from './components/TranslationCard';

function App() {
  const [demoText, setDemoText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero vel bibendum commodo, nunc arcu ultrices nisi, ac tincidunt nisl nunc vel massa. Donec euismod, libero vel bibendum commodo, nunc arcu ultrices nisi, ac tincidunt nisl nunc vel massa.'
  );
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tooltip & Dropdown Demo
        </h1>

        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-4">
            Floating Toolbar Example
          </h2>
          <div className="relative mb-1 max-w-lg">
            <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
              <p className="text-gray-700">{demoText}</p>
            </div>
            <div className="flex">
              <Toolbar
                className="inline-flex"
                onTranslate={() => setShowTranslation(true)}
              />
            </div>
          </div>

          {showTranslation && (
            <div className="mb-2">
              <TranslationCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
