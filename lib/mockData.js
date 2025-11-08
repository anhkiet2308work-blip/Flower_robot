// Mock data generator for demo purposes
export const generateMockSensorData = () => {
  const now = new Date()
  const data = []
  
  for (let i = 19; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000) // Every minute
    data.push({
      ts: timestamp.toISOString(),
    })
  }
  
  return data
}

export const generateTemperatureData = () => {
  return generateMockSensorData().map(item => ({
    ...item,
    value: (25 + Math.random() * 10).toFixed(1), // 25-35°C
  }))
}

export const generateHumidityData = () => {
  return generateMockSensorData().map(item => ({
    ...item,
    value: (60 + Math.random() * 20).toFixed(1), // 60-80%
  }))
}

export const generateLightData = () => {
  return generateMockSensorData().map(item => ({
    ...item,
    value: (200 + Math.random() * 600).toFixed(0), // 200-800 lux
  }))
}

export const generateDustData = () => {
  return generateMockSensorData().map(item => ({
    ...item,
    value: (10 + Math.random() * 40).toFixed(1), // 10-50 ppm
  }))
}

export const generateAirQualityData = () => {
  return generateMockSensorData().map(item => ({
    ...item,
    value: (300 + Math.random() * 200).toFixed(0), // 300-500 ppm
  }))
}

// Generate random status for ON/OFF sensors
export const getRandomStatus = () => {
  return Math.random() > 0.7 ? 'ON' : 'OFF'
}

export const generateMockLatestData = () => {
  const fireStatus = getRandomStatus()
  const thievesStatus = getRandomStatus()
  const soundDanceStatus = getRandomStatus()
  const lightDanceStatus = getRandomStatus()
  
  return {
    temperature_sensor: {
      temp_id: 1,
      ts: new Date().toISOString(),
      value: (28 + Math.random() * 4).toFixed(1),
    },
    humidity_sensor: {
      humidity_sensor_id: 1,
      ts: new Date().toISOString(),
      value: (65 + Math.random() * 15).toFixed(1) + '%',
    },
    light_sensor: {
      light_sensor_id: 1,
      ts: new Date().toISOString(),
      value: (350 + Math.random() * 300).toFixed(0),
    },
    dust_sensor: {
      dust_sensor_id: 1,
      ts: new Date().toISOString(),
      value: (20 + Math.random() * 30).toFixed(1),
    },
    fire_alarm: {
      fire_alarm_id: 1,
      ts: new Date().toISOString(),
      value: fireStatus,
    },
    thieves_alarm: {
      thieves_alarm_id: 1,
      ts: new Date().toISOString(),
      value: thievesStatus,
    },
    sound_dance_sensor: {
      sound_dance_sensor_id: 1,
      ts: new Date().toISOString(),
      value: soundDanceStatus,
    },
    light_dance_sensor: {
      light_dance_sensor_id: 1,
      ts: new Date().toISOString(),
      value: lightDanceStatus,
    },
  }
}

export const generateMockHistoricalData = () => {
  return {
    temperature: generateTemperatureData(),
    humidity: generateHumidityData(),
    light: generateLightData(),
    dust: generateDustData(),
    airQuality: generateAirQualityData(),
  }
}

// Notification messages based on sensor status
export const getNotificationMessage = (sensor, status) => {
  const messages = {
    fire_alarm: {
      ON: '🔥 CẢNH BÁO: Phát hiện có cháy!',
      OFF: '✅ An toàn: Không phát hiện cháy',
    },
    thieves_alarm: {
      ON: '🚨 CẢNH BÁO: Phát hiện có trộm!',
      OFF: '✅ An toàn: Không phát hiện xâm nhập',
    },
    sound_dance_sensor: {
      ON: '🎵 Robot đang nhảy theo nhạc',
      OFF: '⏸️ Chế độ nhảy theo nhạc đã tắt',
    },
    light_dance_sensor: {
      ON: '💡 Robot đang nhảy theo ánh sáng',
      OFF: '⏸️ Chế độ nhảy theo ánh sáng đã tắt',
    },
    humidity_sensor: {
      ON: '🌿 Robot đang xông tinh dầu',
      OFF: '⏸️ Chế độ xông tinh dầu đã tắt',
    },
  }
  
  return messages[sensor]?.[status] || `${sensor}: ${status}`
}

export const getSeverity = (sensor, status) => {
  if (sensor === 'fire_alarm' && status === 'ON') return 'critical'
  if (sensor === 'thieves_alarm' && status === 'ON') return 'critical'
  if (sensor === 'humidity_sensor' && status === 'ON') return 'info'
  if (sensor === 'sound_dance_sensor' && status === 'ON') return 'info'
  if (sensor === 'light_dance_sensor' && status === 'ON') return 'info'
  return 'normal'
}
