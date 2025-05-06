import './App.css'
import Card from './components/Card'
import Sidebar from './components/Sidebar'
import resources from './data/resources.js'

import { useState } from 'react';


const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  const [submenuSelect, setSubmenuSelection] = useState(null);
  const [pendingLang, setPendingLang] = useState(null);

  const filteredResources = resources.filter(r => r.language === selectedLang);
  const filtered = filteredResources.filter(res => res.type === submenuSelect);

  return (
    <div className="layout">
      <Sidebar
        submenuSelect={submenuSelect}
        setSubmenuSelection={setSubmenuSelection}
        onSelect={setSelectedLang}
        selectedLang={selectedLang}
        pendingLang={pendingLang}
        setPendingLang={setPendingLang}
      />
      <div className="main-content">
        {submenuSelect
          ? filtered.map((res, i) => <Card key={i} {...res} />)
          : <p>Please select a resource type.</p>
        }
      </div>
    </div>
  );
};



export default App
