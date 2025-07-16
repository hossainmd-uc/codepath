import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Listitem from '../components/Listitem'

function App() {
  const [count, setCount] = useState(0)
  const [cryptoData, setCryptoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')

  const fetchCryptoData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get('http://localhost:3001/api/crypto/listings')
      setCryptoData(response.data)
      console.log('Crypto data:', response.data)
    } catch (err) {
      setError('Failed to fetch cryptocurrency data')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
  }, [])

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!cryptoData?.data) return []
    
    let filtered = cryptoData.data
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(coin => {
        const price = coin.quote.USD.price
        switch (priceFilter) {
          case 'under1': return price < 1
          case '1to100': return price >= 1 && price < 100
          case '100to1000': return price >= 100 && price < 1000
          case 'over1000': return price >= 1000
          default: return true
        }
      })
    }
    
    return filtered
  }, [cryptoData, searchQuery, priceFilter])

  // Summary statistics
  const statistics = useMemo(() => {
    if (!cryptoData?.data) return null
    
    const data = cryptoData.data
    const prices = data.map(coin => coin.quote.USD.price)
    const changes = data.map(coin => coin.quote.USD.percent_change_1h)
    const volumes = data.map(coin => coin.quote.USD.volume_24h)
    
    // Calculate statistics
    const totalCount = data.length
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length
    const highestPrice = Math.max(...prices)
    const lowestPrice = Math.min(...prices)
    const positiveChanges = changes.filter(change => change > 0).length
    const negativeChanges = changes.filter(change => change < 0).length
    const totalVolume = volumes.reduce((sum, volume) => sum + volume, 0)
    
    // Price quartiles
    const sortedPrices = [...prices].sort((a, b) => a - b)
    const q1Index = Math.floor(sortedPrices.length * 0.25)
    const q3Index = Math.floor(sortedPrices.length * 0.75)
    const medianIndex = Math.floor(sortedPrices.length * 0.5)
    
    return {
      totalCount,
      averagePrice,
      medianPrice: sortedPrices[medianIndex],
      highestPrice,
      lowestPrice,
      positiveChanges,
      negativeChanges,
      totalVolume,
      priceQ1: sortedPrices[q1Index],
      priceQ3: sortedPrices[q3Index]
    }
  }, [cryptoData])

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Crypto Dashboard</h1>
        
        {loading && <p>Loading cryptocurrency data...</p>}
        
        {error && <p style={{color: 'red'}}>Error: {error}</p>}

        {/* Summary Statistics */}
        {statistics && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Market Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total Cryptocurrencies</h3>
                <p className="text-2xl font-bold text-blue-600">{statistics.totalCount}</p>
              </div>
              
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Average Price</h3>
                <p className="text-2xl font-bold text-green-600">${statistics.averagePrice.toFixed(2)}</p>
              </div>
              
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Median Price</h3>
                <p className="text-2xl font-bold text-purple-600">${statistics.medianPrice.toFixed(2)}</p>
              </div>
              
              <div className="bg-orange-100 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Total 24h Volume</h3>
                <p className="text-2xl font-bold text-orange-600">${(statistics.totalVolume / 1e9).toFixed(2)}B</p>
              </div>
              
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">Price Range</h3>
                <p className="text-lg font-bold text-red-600">
                  ${statistics.lowestPrice.toFixed(2)} - ${statistics.highestPrice.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-emerald-100 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-800">1h Performance</h3>
                <p className="text-lg font-bold text-emerald-600">
                  ↑{statistics.positiveChanges} / ↓{statistics.negativeChanges}
                </p>
              </div>
              
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-800">Price Quartiles</h3>
                <p className="text-sm font-bold text-indigo-600">
                  Q1: ${statistics.priceQ1.toFixed(2)}<br/>
                  Q3: ${statistics.priceQ3.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Filtered Results</h3>
                <p className="text-2xl font-bold text-yellow-600">{filteredData.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Cryptocurrencies
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or symbol (e.g., Bitcoin, BTC)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Price Range
            </label>
            <select
              id="priceFilter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="under1">Under $1</option>
              <option value="1to100">$1 - $100</option>
              <option value="100to1000">$100 - $1,000</option>
              <option value="over1000">Over $1,000</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {cryptoData && (
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredData.length} of {statistics?.totalCount || 0} cryptocurrencies
              {searchQuery && ` matching "${searchQuery}"`}
              {priceFilter !== 'all' && ` in selected price range`}
            </p>
          </div>
        )}

        {/* Cryptocurrency Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change 1h</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Supply</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((coin, index) => (
                <Listitem key={coin.id || index} data={coin}/>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results message */}
        {filteredData.length === 0 && cryptoData && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No cryptocurrencies match your current filters.</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setPriceFilter('all')
              }}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
