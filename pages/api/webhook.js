import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  // Allow POST method only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', message: 'Only POST requests are accepted' })
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase not configured')
    return res.status(500).json({ error: 'Database not configured' })
  }

  try {
    const payload = req.body
    console.log('📥 Webhook received:', JSON.stringify(payload, null, 2))

    // Handle "update" type: {"update": "table_name": "new_value"}
    if (payload.update) {
      const tableName = Object.keys(payload)[1] // Get the table name (second key)
      const newValue = payload[tableName]

      console.log(`🔄 UPDATE request: table=${tableName}, value=${newValue}`)

      // Map table names to actual database table names
      const tableMapping = {
        'temperature': 'temperature_sensor',
        'temperature_sensor': 'temperature_sensor',
        'humidity': 'humidity',
        'humidity_sensor': 'humidity_sensor',
        'light': 'light_sensor',
        'light_sensor': 'light_sensor',
        'dust': 'dust_sensor',
        'dust_sensor': 'dust_sensor',
        'fire_alarm': 'fire_alarm',
        'thieves_alarm': 'thieves_alarm',
        'sound_dance': 'sound_dance_sensor',
        'sound_dance_sensor': 'sound_dance_sensor',
        'light_dance': 'light_dance_sensor',
        'light_dance_sensor': 'light_dance_sensor'
      }

      const actualTableName = tableMapping[tableName] || tableName

      // Update the most recent record in the table
      const { data, error } = await supabase
        .from(actualTableName)
        .update({ value: newValue, updated_at: new Date().toISOString() })
        .order('created_at', { ascending: false })
        .limit(1)
        .select()

      if (error) {
        console.error(`❌ Update error for ${actualTableName}:`, error)
        return res.status(500).json({ error: 'Database update failed', details: error.message })
      }

      console.log(`✅ Updated ${actualTableName} to ${newValue}`)
      return res.status(200).json({ 
        success: true, 
        message: `Updated ${actualTableName}`,
        table: actualTableName,
        value: newValue,
        data: data
      })
    }

    // Handle "action" type: {"action": "fire_alarm": "ON"}
    if (payload.action) {
      const tableName = Object.keys(payload)[1] // Get the table name (second key)
      const actionValue = payload[tableName]

      console.log(`⚡ ACTION request: table=${tableName}, value=${actionValue}`)

      // Map table names
      const tableMapping = {
        'fire_alarm': 'fire_alarm',
        'fire': 'fire_alarm',
        'thieves_alarm': 'thieves_alarm',
        'thieves': 'thieves_alarm',
        'thief': 'thieves_alarm',
        'humidity_sensor': 'humidity_sensor',
        'diffuser': 'humidity_sensor',
        'sound_dance_sensor': 'sound_dance_sensor',
        'sound_dance': 'sound_dance_sensor',
        'music': 'sound_dance_sensor',
        'light_dance_sensor': 'light_dance_sensor',
        'light_dance': 'light_dance_sensor',
        'dance': 'light_dance_sensor'
      }

      const actualTableName = tableMapping[tableName] || tableName

      // Update the most recent record
      const { data, error } = await supabase
        .from(actualTableName)
        .update({ value: actionValue.toUpperCase(), updated_at: new Date().toISOString() })
        .order('created_at', { ascending: false })
        .limit(1)
        .select()

      if (error) {
        console.error(`❌ Action error for ${actualTableName}:`, error)
        return res.status(500).json({ error: 'Database action failed', details: error.message })
      }

      console.log(`✅ Action ${actualTableName} set to ${actionValue}`)
      return res.status(200).json({ 
        success: true, 
        message: `Action executed on ${actualTableName}`,
        table: actualTableName,
        value: actionValue.toUpperCase(),
        data: data
      })
    }

    // If neither "update" nor "action" found
    return res.status(400).json({ 
      error: 'Invalid payload format', 
      message: 'Payload must start with "update" or "action"',
      example_update: '{"update": "humidity": "40"}',
      example_action: '{"action": "fire_alarm": "ON"}'
    })

  } catch (error) {
    console.error('❌ Webhook error:', error)
    return res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}
