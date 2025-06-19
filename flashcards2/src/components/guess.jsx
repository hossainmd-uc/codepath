import React, { useState, useEffect, useRef } from 'react'

const Guess = ({index, shuffledResources, userCheckedGuess, setUserCheckedGuess}) => {
    const [guess, setGuess] = useState('')
    const [correct, setCorrect] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        setCorrect(false)
        setUserCheckedGuess(false)
        inputRef.current.value = ''
    }, [index])

    const currentQuestion = shuffledResources[index]

    const checkGuess = (guess) => {
        const isCorrect = checkAnswer(guess, currentQuestion)
        setCorrect(isCorrect)
    }

    const checkAnswer = (userGuess, questionData) => {
        const normalize = (str) => str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .replace(/\s+/g, ' ');   // Normalize spaces
        
        const normalizedGuess = normalize(userGuess);
        setUserCheckedGuess(true)
        // Check against acceptedAnswers array if it exists
        if (questionData.acceptedAnswers) {
            return questionData.acceptedAnswers.some(answer => 
                normalize(answer) === normalizedGuess
            );
        }
        
        // Fallback to checking against main answer
        const normalizedAnswer = normalize(questionData.answer);
        return normalizedGuess === normalizedAnswer;
    };

  return (
    <div>
    {correct ? <div className='text-green-500 text-2xl font-bold'>Correct!</div> : (userCheckedGuess) ? <div className='text-red-500 text-2xl font-bold'>Try again!</div> : null}
    <div className='mt-5 flex flex-row items-center justify-center gap-2'>
        <input ref={inputRef} onChange={(e) => setGuess(e.target.value)} type="text" placeholder="Enter your guess" className='focus:outline-none border-none bg-black text-white w-1/2 h-10 rounded-md border-2 border-gray-300 p-2' />
        <button onClick={() => checkGuess(guess)} className='hover:cursor-pointer hover:bg-emerald-500 hover:scale-105 transition duration-150 transform font-bold bg-black text-white p-2 rounded-md'>Submit</button>
    </div>  
    </div>
  )
}

export default Guess