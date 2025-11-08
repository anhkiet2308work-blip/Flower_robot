import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { city = 'Ho Chi Minh' } = req.query
    
    // Using OpenWeatherMap API (you may need to sign up for a free API key)
    // For now, returning mock data
    const weatherData = {
      city: city,
      temperature: 28,
      humidity: 75,
      description: 'Trời nắng nhẹ',
      forecast: [
        { day: 'Hôm nay', temp: 28, description: 'Nắng' },
        { day: 'Ngày mai', temp: 27, description: 'Mưa nhẹ' },
        { day: 'Ngày kia', temp: 29, description: 'Nắng' },
      ]
    }

    res.status(200).json(weatherData)
  } catch (error) {
    console.error('Weather API Error:', error)
    res.status(500).json({ message: 'Error fetching weather data' })
  }
}
