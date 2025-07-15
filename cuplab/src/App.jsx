import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

["url", ""]
["url", ""]


function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    }
    
  }
  
  

  return (

    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>

    </div>

  )
}

export default App
