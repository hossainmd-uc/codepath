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
        {submenuSelection
          ? filtered.map((res, i) => <Card key={i} {...res} />)
          : 
          <div className="welcome-page">
          <h1>Welcome to the Resource Hub</h1>
          <img
            src="/images/techbot.svg" // use your uploaded image here
            alt="welcome"
            style={{ maxWidth: "400px", marginTop: "20px" }}
          />
          <p style={{ marginTop: "20px" }}>Select a language from the sidebar to explore videos and books.</p>
        </div>
        }
      </div>
    </div>
  );
};



export default App
