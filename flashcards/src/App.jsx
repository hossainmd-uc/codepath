import { useState } from 'react'
import './App.css'
import Flashcard from './components/flashcard'
import resources from './data/resources.js'

function App() {
  const [text, setText] = useState(resources[0].question)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false);

  const [start, setStart] = useState(false);

  const next= () => {
    setIndex(curr => {
      if (curr < resources.length-1){
        const updated = curr + 1;
        setText(resources[updated].question);
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
        setText(resources[updated].question);
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
    // newFlipped ? setText(resources[index].answer):setText(resources[index].question);
    
  }

  return (
    <>
    <div className='main flex items-center flex-col w-full h-full bg-[#1e1e2f] transition-all duration-900 animate-fade-in'>
      {!start ? (
      <div className='start-page'>
      <div className='title mt-15 mb-15'>
        <p className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Do you have what it takes to be a science nerd?</p>
        <p className='text-xl mt-5 font-bold' >Test yourself in Physics, Chemistry, Earth Science, and Biology using these {resources.length} flash cards!</p>
        <button onClick={() => setStart(true)} className='mt-20 text-5xl font-bold mt-5 py-1 px-7 active:bg-red-500 bg-black hover:bg-white  hover:text-black cursor-pointer rounded transition duration-300 transform hover:scale-105 min-w-md h-20'>I'm ready!</button>
      </div>
      </div>) :
      
       (<div className='mt-20 main flex items-center flex-col w-full h-full bg-[#1e1e2f] transition-all duration-700 animate-fade-in'>
       <h1 class="text-5xl mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600" >The Ultimate Science Nerd </h1>
       <div class="flip-card">
        <div className={`${flipped ? "flipped" : ""} flip-card-inner `} >
          <div class="flip-card-front">
          <Flashcard img={resources[index].img} difficulty={resources[index].difficulty} flip={() => flip()} text={resources[index].question}/>
           </div>
           <div class="flip-card-back">
          <Flashcard difficulty={resources[index].difficulty} flip={() => flip()} text={resources[index].answer}/>
          </div>
        </div>
       </div>
       <div className='mt-5 flex flex-row gap-3'>
        <img onClick={() => prev()} className='cursor-pointer border-rounded-sm p-2 bg-[#111827] size-9 active:bg-gray-900 hover:bg-emerald-500' src='/images/caret-left-white-icon.png'/>
        <img onClick={() => next()} className='cursor-pointer border-rounded-sm p-2 bg-[#111827] size-9 active:bg-gray-900 hover:bg-emerald-500' src='/images/caret-right-white-icon.png'/>
       </div>
       </div>
    )}

    </div>
    </>
  )
}

export default App
