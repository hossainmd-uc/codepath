import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState('daily');

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch historical data
        const historicalResponse = await axios.get(`http://localhost:3001/api/crypto/historical/${id}?count=100&interval=${interval}`);
        setHistoricalData(historicalResponse.data);

        // Get crypto info from historical data
        if (historicalResponse.data?.data?.[id]) {
          setCryptoData(historicalResponse.data.data[id]);
        }

      } catch (err) {
        setError('Failed to fetch cryptocurrency details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCryptoDetail();
    }
  }, [id, interval]);

  const prepareChartData = () => {
    if (!historicalData?.data?.[id]?.quotes) return null;

    const quotes = historicalData.data[id].quotes;
    const sortedQuotes = quotes.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const labels = sortedQuotes.map(quote => {
      const date = new Date(quote.timestamp);
      return interval === 'hourly' 
        ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        : date.toLocaleDateString();
    });

    const prices = sortedQuotes.map(quote => quote.quote.USD.price);

    return {
      labels,
      datasets: [
        {
          label: 'Price (USD)',
          data: prices,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${cryptoData?.name || 'Cryptocurrency'} Price History (Last 100 ${interval === 'hourly' ? 'Hours' : 'Days'})`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading cryptocurrency details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!cryptoData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-lg mb-4">Cryptocurrency not found</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const chartData = prepareChartData();
  const latestQuote = historicalData?.data?.[id]?.quotes?.[0]?.quote?.USD;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')}
          className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Back to Dashboard
        </button>
        
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold mr-4">{cryptoData.name}</h1>
          <span className="text-xl text-gray-600">({cryptoData.symbol})</span>
        </div>
      </div>

      {/* Current Price Info */}
      {latestQuote && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Current Price</h3>
            <p className="text-2xl font-bold text-blue-600">${latestQuote.price.toFixed(2)}</p>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">24h Volume</h3>
            <p className="text-xl font-bold text-green-600">${latestQuote.volume_24h.toLocaleString()}</p>
          </div>
          
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Market Cap</h3>
            <p className="text-xl font-bold text-purple-600">${latestQuote.market_cap.toLocaleString()}</p>
          </div>
          
          <div className={`${latestQuote.percent_change_24h >= 0 ? 'bg-emerald-100' : 'bg-red-100'} p-4 rounded-lg`}>
            <h3 className={`font-semibold ${latestQuote.percent_change_24h >= 0 ? 'text-emerald-800' : 'text-red-800'}`}>
              24h Change
            </h3>
            <p className={`text-xl font-bold ${latestQuote.percent_change_24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {latestQuote.percent_change_24h >= 0 ? '+' : ''}
              {latestQuote.percent_change_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      )}

      {/* Price Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Price Chart</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="interval" className="text-sm font-medium text-gray-700">
              Interval:
            </label>
            <select
              id="interval"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
        </div>
        {chartData ? (
          <div className="h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center text-gray-500">
            No historical data available for chart
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Rank:</strong> #{cryptoData.cmc_rank || 'N/A'}</p>
            <p><strong>Max Supply:</strong> {cryptoData.max_supply ? cryptoData.max_supply.toLocaleString() : 'N/A'}</p>
            <p><strong>Circulating Supply:</strong> {cryptoData.circulating_supply ? cryptoData.circulating_supply.toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <p><strong>Total Supply:</strong> {cryptoData.total_supply ? cryptoData.total_supply.toLocaleString() : 'N/A'}</p>
            <p><strong>Last Updated:</strong> {cryptoData.last_updated ? new Date(cryptoData.last_updated).toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail; 