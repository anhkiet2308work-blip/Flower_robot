import { supabase } from '@/lib/supabase'

// POST endpoint to accept remote JSON updates/actions and apply them to Supabase
// Expected payloads:
// { "update": { "humidity": "40" } }
// { "action": { "fire_alarm": "ON" } }

// In-memory array to store triggers for popup notifications
export const remoteTriggers = []

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!supabase) {
    console.error('Supabase client is not initialized')
    return res.status(500).json({ message: 'Database not configured' })
  }

  const body = req.body || {}

  // Normalize payload to array of { table, value }
  const operations = []

  if (body.update && typeof body.update === 'object') {
    for (const [key, value] of Object.entries(body.update)) {
      operations.push({ op: 'update', sensor: key, value })
    }
  }

  if (body.action && typeof body.action === 'object') {
    for (const [key, value] of Object.entries(body.action)) {
      operations.push({ op: 'action', sensor: key, value })
    }
  }

  if (operations.length === 0) {
    return res.status(400).json({ message: 'No update or action found in payload' })
  }

  // Allowed tables (these are the tables the app expects)
  const allowedTables = new Set([
    'dust_sensor',
    'fire_alarm',
    'humidity',
    'humidity_sensor',
    'light_dance_sensor',
    'light_sensor',
    'sound_dance_sensor',
    'temperature_sensor',
    'thieves_alarm'
  ])

  // Helper to apply a single operation
  const applyOp = async ({ sensor, value }) => {
    // sensor may be provided in friendly name (e.g., 'humidity')
    const tableName = sensor // assume direct mapping

    if (!allowedTables.has(tableName)) {
      return { sensor, ok: false, error: 'Unknown table/sensor' }
    }

    try {
      // fetch latest row to get id field
      const { data: existingData, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('ts', { ascending: false })
        .limit(1)
        .single()

      if (fetchError) {
        console.error(`Fetch error for ${tableName}:`, fetchError)
        return { sensor, ok: false, error: fetchError.message }
      }

      if (!existingData) {
        return { sensor, ok: false, error: 'No row found in table' }
      }

      // find the id field (ends with _id)
      const idFieldName = Object.keys(existingData).find(k => k.endsWith('_id'))
      if (!idFieldName) return { sensor, ok: false, error: 'ID field not found' }

      const rowId = existingData[idFieldName]

      // Normalize value: if numeric keep as-is, otherwise uppercase common ON/OFF values
      let newValue = value
      const stringVal = String(value)
      if (!isNaN(Number(stringVal))) {
        newValue = Number(stringVal)
      } else {
        // For textual values, convert ON/OFF to uppercase for consistency
        if (stringVal.toLowerCase() === 'on' || stringVal.toLowerCase() === 'off') {
          newValue = stringVal.toUpperCase()
        } else {
          newValue = stringVal
        }
      }

      const { data, error } = await supabase
        .from(tableName)
        .update({ value: newValue, ts: new Date().toISOString() })
        .eq(idFieldName, rowId)
        .select()
        .single()

      if (error) {
        console.error(`Update error for ${tableName}:`, error)
        return { sensor, ok: false, error: error.message }
      }

      return { sensor, ok: true, data }
    } catch (err) {
      console.error('Exception applying op:', err)
      return { sensor, ok: false, error: err.message }
    }
  }

  // Execute all operations sequentially (could be parallelized if needed)
  const results = []
  for (const op of operations) {
    const r = await applyOp(op)
    results.push(r)
    
    // If operation is successful and it's for fire_alarm or thieves_alarm,
    // add to remoteTriggers for popup notification
    if (r.ok && (op.sensor === 'fire_alarm' || op.sensor === 'thieves_alarm')) {
      console.log(`📡 [REMOTE-UPDATE] Adding trigger for ${op.sensor} with value ${op.value}`)
      remoteTriggers.push({
        sensor: op.sensor,
        value: String(op.value).toUpperCase(),
        timestamp: Date.now()
      })
    }
  }

  // Return results for each requested change
  res.status(200).json({ success: true, results })
}
