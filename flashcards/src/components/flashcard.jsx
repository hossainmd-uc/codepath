
import '../App.css'

const Flashcard = ({text, flip, img, difficulty}) => {
    return (
        <div onClick={flip} className= {difficulty + " cursor-pointer select-none hover:outline-1 hover:outline-offset-1 hover:outline-black-500 flex justify-center items-center shadow-2xs  active:bg-emerald-500 text-3xl text-[	#9ca3af] border-1 border-[#374151] rounded-xl mx-auto max-w-140 bg-[#111827] w-[100%] h-[100%] flex-col content-evenly gap-4"}>
            {text}
            <img src={img} />
        </div>
    )
}

export default Flashcard