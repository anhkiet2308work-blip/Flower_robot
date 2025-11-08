import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.error('Supabase client is not initialized')
    return res.status(500).json({ message: 'Database not configured' })
  }

  const { sensor, value } = req.body

  if (!sensor || !value) {
    return res.status(400).json({ message: 'Missing sensor or value' })
  }

  // Map sensor names to table names
  const sensorTableMap = {
    fire_alarm: 'fire_alarm',
    thieves_alarm: 'thieves_alarm',
    humidity_sensor: 'humidity_sensor',
    sound_dance_sensor: 'sound_dance_sensor',
    light_dance_sensor: 'light_dance_sensor',
  }

  const tableName = sensorTableMap[sensor]
  
  if (!tableName) {
    return res.status(400).json({ message: 'Invalid sensor name' })
  }

  try {
    // Get the first (and only) row from the table
    const { data: existingData, error: fetchError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
      .single()

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      return res.status(500).json({ message: 'Database fetch error', error: fetchError.message })
    }

    if (!existingData) {
      return res.status(404).json({ message: 'No row found in table' })
    }

    // Get the ID field name (e.g., fire_alarm_id, thieves_alarm_id, etc.)
    const idFieldName = Object.keys(existingData).find(key => key.endsWith('_id'))
    
    if (!idFieldName) {
      return res.status(500).json({ message: 'Could not find ID field' })
    }

    const rowId = existingData[idFieldName]

    // UPDATE the existing row (NOT insert new row)
    const { data, error } = await supabase
      .from(tableName)
      .update({
        value: value.toUpperCase(), // ON or OFF
        ts: new Date().toISOString()
      })
      .eq(idFieldName, rowId)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return res.status(500).json({ message: 'Database update error', error: error.message })
    }

    res.status(200).json({ 
      success: true, 
      message: `${sensor} updated to ${value}`,
      data 
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
