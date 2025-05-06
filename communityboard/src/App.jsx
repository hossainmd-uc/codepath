import './App.css'
import Card from './components/Card'
import Sidebar from './components/Sidebar'
import resources from './data/resources.js'

import { useState } from 'react';


const App = () => {
  //use states to tell Main Page what to render based on SideBar icon selection
  const [selectedLang, setSelectedLang] = useState(null);

  //filter resources by selected language
  const filteredResources = resources.filter(r => r.language === selectedLang)

  return (
    <div className="layout">
      <Sidebar onSelect={setSelectedLang} />
      <div className="main-content">

      </div>
    </div>
  );
};

export default App
