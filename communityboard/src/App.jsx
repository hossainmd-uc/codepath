import './App.css'
import Card from './components/Card'
import Sidebar from './components/Sidebar'
import resources from './data/resources.js'

import { useState } from 'react';


const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  const [submenuSelection, setSubmenuSelection] = useState(null);
  const [renderedLang, setRenderedLang] = useState(null);

  const filteredResources = resources.filter(r => r.language === renderedLang);
  const filtered = filteredResources.filter(res => res.type === submenuSelection);

  return (
    <div className="layout">
      <Sidebar
        submenuSelect={submenuSelection}
        setSubmenuSelection={setSubmenuSelection}

        setSelectedLang={setSelectedLang}
        selectedLang={selectedLang}

        renderedLang={renderedLang}
        setRenderedLang={setRenderedLang}
      />
        <div className="main-content">
        {submenuSelection ? (
          <div className="flex flex-col w-full max-w-6xl px-6 gap-6">
            <h1 className="text-4xl font-bold">Resources</h1>
            <div className="flex flex-wrap gap-6">
              {filtered.map((res, i) => (
                <Card key={i} {...res} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-6 max-w-xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">
              Welcome to the Resource Hub
            </h1>
            <div className="flex justify-center mt-25">
              <img
                src="/images/techbot.svg"
                alt="welcome"
                className="w-full max-w-xs h-auto animate-bounce"
              />
            </div>
            <p className="text-lg text-gray-700 mt-4">
              Select a language from the sidebar to explore videos and books.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};



export default App
