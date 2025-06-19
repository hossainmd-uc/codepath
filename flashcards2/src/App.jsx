import { useState } from 'react'
import './App.css'
import Flashcard from './components/flashcard'
import resources from './data/resources.js'
import Guess from './components/guess.jsx'

function App() {
  const [text, setText] = useState(resources[0].question)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false);
  const [shuffledResources, setShuffledResources] = useState([...resources]);
  const [userCheckedGuess, setUserCheckedGuess] = useState(false)

  const [start, setStart] = useState(false);
  

  const next= () => {
    setIndex(curr => {
      if (curr < shuffledResources.length-1){
        const updated = curr + 1;
        setText(shuffledResources[updated].question);
        setFlipped(false);
        return updated;
      }
      return curr
    });
    console.log(index)
  }

  const prev= () => {
    setIndex(curr => {
      if (curr > 0){
        const updated = curr - 1;
        setText(shuffledResources[updated].question);
        setFlipped(false);
        return updated;
      }
      return curr
    });
    console.log(index)
  }

  const flip = () => {
    const newFlipped = !flipped
    setFlipped(newFlipped)
    console.log("clicked")
    // newFlipped ? setText(shuffledResources[index].answer):setText(shuffledResources[index].question);
    
  }

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array]; // Create a copy to avoid mutating original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffle = () => {
    const newShuffledArray = shuffleArray(resources);
    setShuffledResources(newShuffledArray);
    setIndex(0); // Reset to first card
    setText(newShuffledArray[0].question);
    setFlipped(false);
  };

  return (
    <>
    <div className='main flex items-center flex-col w-full h-full bg-[#1e1e2f] transition-all duration-900 animate-fade-in'>
      {!start ? (
      <div className='start-page'>
      <div className='title mt-15 mb-15'>
        <p className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Do you have what it takes to be a science nerd?</p>
        <p className='text-xl mt-5 font-bold' >Test yourself in Physics, Chemistry, Earth Science, and Biology using these {shuffledResources.length} flash cards!</p>
        <button onClick={() => setStart(true)} className='mt-20 text-5xl font-bold mt-5 py-1 px-7 active:bg-red-500 bg-black hover:bg-white  hover:text-black cursor-pointer rounded transition duration-300 transform hover:scale-105 min-w-md h-20'>I'm ready!</button>
      </div>
      </div>) :
      
       (<div className='mt-20 main flex items-center flex-col w-full h-full bg-[#1e1e2f] transition-all duration-700 animate-fade-in'>
       <h1 class="text-5xl mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600" >The Ultimate Science Nerd </h1>
       <div class="flip-card">
        <div className={`${flipped ? "flipped" : ""} flip-card-inner `} >
          <div class="flip-card-front">
          <Flashcard img={shuffledResources[index].img} difficulty={shuffledResources[index].difficulty} flip={() => flip()} text={shuffledResources[index].question}/>
           </div>
           <div class="flip-card-back">
          <Flashcard difficulty={shuffledResources[index].difficulty} flip={() => flip()} text={shuffledResources[index].answer}/>
          </div>
        </div>
       </div>
       <Guess index={index} shuffledResources={shuffledResources} userCheckedGuess={userCheckedGuess} setUserCheckedGuess={setUserCheckedGuess}/>
       <div className='mt-5 flex flex-row gap-3'>
        <img onClick={() => prev()} className='transition duration-50 transform hover:scale-120 cursor-pointer border-rounded-sm p-2 bg-[#111827] size-9 active:bg-gray-900 hover:bg-emerald-500' src='/images/caret-left-white-icon.png'/>
        <img onClick={() => next()} className='transition duration-50 transform hover:scale-120 cursor-pointer border-rounded-sm p-2 bg-[#111827] size-9 active:bg-gray-900 hover:bg-emerald-500' src='/images/caret-right-white-icon.png'/>
        <button onClick={() => shuffle()} className='text-md font-bold   active:bg-red-500 bg-black hover:bg-white  hover:text-black cursor-pointer rounded transition duration-150 transform hover:scale-105 min-w-20'>Shuffle</button>
        <button onClick={() => setStart(false)} className='text-md font-bold   active:bg-red-500 bg-black hover:bg-white  hover:text-black cursor-pointer rounded transition duration-150 transform hover:scale-105 min-w-20'>Restart</button>
       </div>
       </div>
    )}

    </div>
    </>
  )
}

export default App
