import './App.css'
import Card from './components/Card'
import Sidebar from './components/Sidebar'

import { useState } from 'react';


const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  console.log('Selected language is:', selectedLang); // debugging

  return (
    <>
      <div className="layout">
        <Sidebar onSelect={setSelectedLang}/>
          <div className="main-content">
            {selectedLang === null ? (
              <p>Please select a topic from the sidebar.</p>
            ) : selectedLang === 'react' ? (
              <>
                <Card class="react" resource="React" src="/images/react.svg"
                  href="https://www.youtube.com/watch?v=Ke90Tje7VS0"
                  diff="Beginners"/>
                <Card class="react" resource="React" src="/images/react.svg"
                  href="https://www.youtube.com/watch?v=Ke90Tje7VS0"
                  diff="Beginners"/>
                <Card class="react" resource="React" src="/images/react.svg"
                  href="https://www.youtube.com/watch?v=Ke90Tje7VS0"
                  diff="Beginners"/>
              </>
            ): null}
          </div>
      </div>
    </>
  )
}

export default App
