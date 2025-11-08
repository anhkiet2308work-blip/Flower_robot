import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { limit = 100 } = req.query

    // Fetch data from all sensor tables
    const [
      { data: dustData, error: dustError },
      { data: fireData, error: fireError },
      { data: humidityData, error: humidityError },
      { data: lightDanceData, error: lightDanceError },
      { data: lightData, error: lightError },
      { data: soundDanceData, error: soundDanceError },
      { data: temperatureData, error: temperatureError },
      { data: thievesData, error: thievesError },
    ] = await Promise.all([
      supabase.from('dust_sensor').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('fire_alarm').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('humidity_sensor').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('light_dance_sensor').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('light_sensor').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('sound_dance_sensor').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('temperature_sensor').select('*').order('ts', { ascending: false }).limit(limit),
      supabase.from('thieves_alarm').select('*').order('ts', { ascending: false }).limit(limit),
    ])

    if (dustError || fireError || humidityError || lightDanceError || 
        lightError || soundDanceError || temperatureError || thievesError) {
      throw new Error('Error fetching sensor data')
    }

    res.status(200).json({
      dust: dustData,
      fire: fireData,
      humidity: humidityData,
      lightDance: lightDanceData,
      light: lightData,
      soundDance: soundDanceData,
      temperature: temperatureData,
      thieves: thievesData,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
