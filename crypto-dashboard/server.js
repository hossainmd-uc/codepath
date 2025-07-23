import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Support both localhost and 127.0.0.1
  credentials: true
}));

app.use(express.json());

// Disable caching for API responses
app.use('/api', (req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

// Store API key securely (in production, use environment variables)
const CMC_API_KEY = 'c158e022-a8a6-482f-8d34-c5c19d11119c';

// Proxy endpoint for cryptocurrency listings
app.get('/api/crypto/listings', async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': CMC_API_KEY
      },
      params: {
        limit: 10  // Limit to first 10 cryptocurrencies
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

// Endpoint for fetching historical cryptocurrency data
app.get('/api/crypto/historical/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { count = 100, interval = 'daily' } = req.query; // Default to 100 data points and daily interval
    
    const response = await axios({
      method: 'get',
      url: 'https://pro-api.coinmarketcap.com/v3/cryptocurrency/quotes/historical',
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': CMC_API_KEY
      },
      params: {
        id: id,
        count: count,
        interval: interval // Support both 'daily' and 'hourly' intervals
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical crypto data:', error.message);
    res.status(500).json({ error: 'Failed to fetch historical cryptocurrency data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 