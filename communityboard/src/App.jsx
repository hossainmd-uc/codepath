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
          : <p>Please select a resource type.</p>
        }
      </div>
    </div>
  );
};



export default App
