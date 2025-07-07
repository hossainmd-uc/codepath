import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [apiResp, setApiResp] = useState({})
  const [img, setImg] = useState('')
  


  useEffect(() => {
    console.log("ran")
    const apirequest = () => {
      try {
        axios({
          method: 'get',
          url: 'https://api.thedogapi.com/v1/images/search?has_breeds=1',
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_lfKQjh6rSgBAGe0O0FsY27k2SHd6EkfluLP5hyCUL5O3wConchbLk7yIeeNZMbnh"
          },
          timeout: 1500
      
        })
        .then(function (response) {
          const data = response.data
          setApiResp(data[0])
          setImg(data[0].url)
          console.log(data)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
      catch (e) {
        print(e)
      }
    }

    apirequest()
  }, [])

  

  

  return (
    <>
    <h5 className="text-2xl font-bold mb-4">Doggy Dopamine Booster</h5>
 
      <div className='flex flex-row gap-2'>
        <div className='basis-1/4'>Test testset setse tse</div>
        <div className='basis-1/2'>
          {img ? (
            <img className='w-full h-64 object-cover rounded-lg shadow-lg' src={img}/>
          ) : (
            <div className='w-full h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center animate-pulse'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4'></div>
                <p className='text-gray-500 text-lg'>Loading adorable dog...</p>
                <div className='w-3/4 h-4 bg-gray-300 rounded mx-auto mt-2'></div>
                <div className='w-1/2 h-4 bg-gray-300 rounded mx-auto mt-2'></div>
              </div>
            </div>
          )}
          <div className='mt-3'>
            {apiResp?.breeds?.length > 0 && (
              <p className='text-xl font-semibold text-gray-800'>{apiResp.breeds[0].name}</p>
            )}
          </div>
        </div>
        <div className='basis-1/4'> t estset est set s te test estsettes estse tse tsetset sett retes tse t test setest estes etstestest</div>
      </div>
      </>
  )
}

export default App
