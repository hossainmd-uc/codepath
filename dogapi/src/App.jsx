import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [seen, setSeen] = useState([])
  const [apiResp, setApiResp] = useState({})
  const [img, setImg] = useState('')
  const [banList, setBanList] = useState([])

  // Add a term to the ban list if it is not already present
  const handleBanTerm = (term) => {
    const trimmed = term.trim()
    if (trimmed && !banList.includes(trimmed)) {
      setBanList((prev) => [...prev, trimmed])
    }
  }

  // Remove a term from the ban list
  const handleRemoveBan = (term) => {
    setBanList((prev) => prev.filter((t) => t !== term))
  }

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
        const dogName = data[0]?.breeds?.[0]?.name || 'Unknown'
        const bredForStr = data[0]?.breeds?.[0]?.bred_for || ""
        const bredTerms = bredForStr.split(",").map((t) => t.trim()).filter(Boolean)

        const breedGroupStr = data[0]?.breeds?.[0]?.breed_group || ""
        const breedGroupTerms = breedGroupStr.split(",").map((t) => t.trim()).filter(Boolean)
        
        const temperamentStr = data[0]?.breeds?.[0]?.temperament || ""
        const temperamentTerms = temperamentStr.split(",").map((t) => t.trim()).filter(Boolean)

        // If any of the dog's attributes are currently banned, fetch another dog instead
        if ([...bredTerms, ...breedGroupTerms, ...temperamentTerms].some((term) => banList.includes(term))) {
          apirequest() // try again
          return
        }

        setSeen((prev) => [...prev, { url: data[0].url, name: dogName }])
        console.log(seen)
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

  useEffect(() => {
    apirequest()
  }, [])

  

  

  return (
    <div className='flex flex-col items-center gap-2'>
      <div>
    <h5 className="text-2xl font-bold mb-4">Doggy Dopamine Booster</h5>
 
      <div className='flex flex-row gap-2'>
        <div className='basis-1/4 flex flex-col items-center'>
        <span className="mb-2 font-semibold">Seen So Far</span>
        <div className='flex flex-col items-center h-80 overflow-y-auto gap-2'>
          {seen.length > 0 && seen.map((dog, i) => (
            <div key={i} className="flex flex-col items-center">
              <img className="w-20 h-20 object-cover rounded-sm" src={dog.url} />
              <p className="mt-1 text-xs text-gray-700 text-center">{dog.name}</p>
            </div>
          ))}
          </div>
          </div>
        <div className='basis-1/2'>
          {img ? (
            <img className='min-h-140 w-full h-64 object-cover rounded-lg shadow-lg' src={img}/>
          ) : (
            <div className='min-h-120 w-full h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center animate-pulse'>
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

          <div className='flex flex-row flex-wrap justify-center gap-2 mt-3'>
            {apiResp?.breeds?.[0]?.bred_for &&
              apiResp.breeds[0].bred_for
                .split(',')
                .map((b) => b.trim())
                .filter(Boolean)
                .map((breed, i) => (
                  <div
                    key={i}
                    onClick={() => handleBanTerm(breed)}
                    className="text-center max-w-40 py-2 px-4 bg-blue-600 text-white rounded-sm shadow hover:bg-blue-700 cursor-pointer"
                  >
                    <p className='text-sm font-semibold'>{breed}</p>
                  </div>
                ))}

            {/* Breed Group */}
            {apiResp?.breeds?.[0]?.breed_group &&
              apiResp.breeds[0].breed_group
                .split(',')
                .map((g) => g.trim())
                .filter(Boolean)
                .map((group, i) => (
                  <div
                    key={`group-${i}`}
                    onClick={() => handleBanTerm(group)}
                    className="text-center max-w-40 py-2 px-4 bg-green-600 text-white rounded-sm shadow hover:bg-green-700 cursor-pointer"
                  >
                    <p className='text-sm font-semibold'>{group}</p>
                  </div>
                ))}

            {/* Temperament */}
            {apiResp?.breeds?.[0]?.temperament &&
              apiResp.breeds[0].temperament
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
                .map((temp, i) => (
                  <div
                    key={`temp-${i}`}
                    onClick={() => handleBanTerm(temp)}
                    className="text-center max-w-40 py-2 px-4 bg-purple-600 text-white rounded-sm shadow hover:bg-purple-700 cursor-pointer"
                  >
                    <p className='text-sm font-semibold'>{temp}</p>
                  </div>
                ))}
          </div>
          <div onClick={apirequest} className="mt-3 text-center max-w-40 py-3 px-5 bg-green-600 text-white rounded-sm shadow hover:bg-green-700 focus:outline-none focus:ring-2 hover:cursor-pointer mx-auto">
          Next
        </div>
        </div>
        <div className='basis-1/4 flex flex-col items-center'>
          <span className='mb-2 font-semibold'>Ban List</span>
          <div className='flex flex-col items-center h-80 overflow-y-auto gap-2'>
            {banList.length === 0 && (
              <p className='text-xs text-gray-500'>No terms banned</p>
            )}
            {banList.map((term) => (
              <div
                key={term}
                onClick={() => handleRemoveBan(term)}
                className='text-center max-w-40 py-2 px-4 bg-red-600 text-white rounded-sm shadow hover:bg-red-700 cursor-pointer'
              >
                {term}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
        </div>
  )
}

export default App
