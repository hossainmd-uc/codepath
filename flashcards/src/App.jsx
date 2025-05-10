import { useState } from 'react'
import './App.css'
import Flashcard from './components/flashcard'
import resources from './data/resources.js'

function App() {
  const [text, setText] = useState(resources[0].question)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false);

  const next= () => {
    setIndex(curr => {
      if (curr < resources.length-1){
        const updated = curr + 1;
        setText(resources[updated].question);
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
    newFlipped ? setText(resources[index].answer):setText(resources[index].question);
  }

  return (
    <>
      <div className='main flex items-center flex-col w-full h-full bg-[#1e1e2f]'>
      <div className='title mt-15 mb-15'>
        <p className='text-5xl'>Hello!</p>
        <p>There are {resources.length} cards!</p>
        </div>
       <Flashcard difficulty={resources[index].difficulty} flip={() => flip()} text={text}/>
       <div className='mt-5 flex flex-row gap-3'>
        <img onClick={() => prev()} className='border- rounded-sm p-2 bg-[#111827] size-9 active:bg-gray-900 hover:bg-emerald-500' src='/images/caret-left-white-icon.png'/>
        <img onClick={() => next()} className='border- rounded-sm p-2 bg-[#111827] size-9 active:bg-gray-900 hover:bg-emerald-500' src='/images/caret-right-white-icon.png'/>
       </div>
      </div>
    </>
  )
}

export default App
