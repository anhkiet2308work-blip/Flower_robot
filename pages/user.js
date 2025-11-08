import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import SimpleSensorCard from '@/components/SimpleSensorCard'
import SimpleStatusBox from '@/components/SimpleStatusBox'
import AlertPopup from '@/components/AlertPopup'
import ChatBox from '@/components/ChatBox'
import { useRouter } from 'next/router'

export default function RobotMode() {
  const router = useRouter()
  const [latestData, setLatestData] = useState({})
  const [activeAlert, setActiveAlert] = useState(null)
  const [dismissedAlerts, setDismissedAlerts] = useState([]) // Chỉ dùng để ngăn popup lặp lại
  const [disabledFeatures, setDisabledFeatures] = useState([]) // Dùng cho Status Box (tắt thủ công)
  const [hasSpokenAlert, setHasSpokenAlert] = useState({})
  const [manualToggleInProgress, setManualToggleInProgress] = useState(false)
  const [lastRemoteValues, setLastRemoteValues] = useState({})

  // Fetch latest sensor data
  const fetchLatestData = async () => {
    try {
      console.log('🔄 [ROBOT MODE] Fetching sensor data from /api/sensors/latest...')
      const response = await axios.get('/api/sensors/latest')
      console.log('✅ [ROBOT MODE] Response received:', response.status)
      
      // Check if response has _meta (new format)
      if (response.data._meta) {
        console.log('📊 [ROBOT MODE] Meta info:', response.data._meta)
        if (response.data._meta.errors && response.data._meta.errors.length > 0) {
          console.error('⚠️ [ROBOT MODE] API returned errors:', response.data._meta.errors)
        }
      }
      
      // Remove _meta before setting data
      const { _meta, ...sensorData } = response.data
      
      if (!sensorData || Object.keys(sensorData).length === 0) {
        console.warn('⚠️ [ROBOT MODE] Empty data received from API')
      } else {
        console.log('✅ [ROBOT MODE] Received data for', Object.keys(sensorData).length, 'sensors')
      }
      
      setLatestData(sensorData)
      checkForAlerts(sensorData)
    } catch (error) {
      console.error('❌ [ROBOT MODE] Error fetching data:', error)
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
    }
  }

  const speakAlert = (text, alertId) => {
    if (typeof window !== 'undefined') {
      // Chỉ đọc 1 lần cho mỗi lần cảnh báo được kích hoạt
      if (hasSpokenAlert[alertId]) return
      
      console.log(`🚨 Alert speaking: ${alertId} - "${text}"`)
      
      // Use our API proxy for TTS
      const audioUrl = `/api/tts?text=${encodeURIComponent(text)}`
      
      const audio = new Audio(audioUrl)
      
      audio.onloadeddata = () => {
        console.log(`📥 Alert audio loaded: ${alertId}`)
      }
      
      audio.onended = () => {
        console.log(`✅ Alert spoken: ${alertId}`)
        setHasSpokenAlert(prev => ({ ...prev, [alertId]: true }))
      }
      
      audio.onerror = (e) => {
        console.error(`❌ Alert TTS error for ${alertId}:`, e)
        setHasSpokenAlert(prev => ({ ...prev, [alertId]: true }))
      }
      
      audio.play().catch(err => {
        console.error('Alert audio play failed:', err)
        setHasSpokenAlert(prev => ({ ...prev, [alertId]: true }))
      })
    }
  }

  const checkForAlerts = (data) => {
    // BỎ LOGIC POPUP TỰ ĐỘNG
    // Popup CHỈ được trigger từ checkRemoteTriggers(), KHÔNG từ polling data
    
    // Chỉ update lastRemoteValues để tracking
    const fireValue = String(data.fire_alarm?.value || '').toUpperCase()
    const thievesValue = String(data.thieves_alarm?.value || '').toUpperCase()
    
    setLastRemoteValues(prev => ({
      ...prev,
      fire_alarm: fireValue,
      thieves_alarm: thievesValue
    }))
    
    // NO POPUP HERE - only from remote triggers
    setActiveAlert(null)
  }

  const handleDismissAlert = async () => {
    if (activeAlert && activeAlert.canDismiss) {
      // CHỈ ĐÓNG POPUP - KHÔNG TẮT chức năng cảnh báo
      console.log(`🔕 [USER MODE] Đóng popup cảnh báo: ${activeAlert.id}`)
      
      // Thêm vào dismissedAlerts để tránh popup hiện lại ngay lập tức
      setDismissedAlerts([...dismissedAlerts, activeAlert.id])
      setActiveAlert(null)
      
      // Sau 10 giây, xóa khỏi dismissedAlerts để có thể hiện popup lại nếu có trigger mới
      setTimeout(() => {
        setDismissedAlerts(prev => prev.filter(id => id !== activeAlert.id))
      }, 10000)
    }
  }

  const handleDismissStatus = async (id) => {
    console.log('💾 NÚT TẮT - Đang cập nhật database:', id)
    
    // Đánh dấu là thay đổi thủ công - KHÔNG hiện popup
    setManualToggleInProgress(true)
    
    // Update database to turn OFF
    try {
      await axios.post('/api/sensors/update', {
        sensor: id,
        value: 'OFF'
      })
      console.log(`✅ ĐÃ CẬP NHẬT database - Turned OFF ${id}`)
      
      // Cập nhật lastRemoteValues để không popup khi poll
      setLastRemoteValues(prev => ({ ...prev, [id]: 'OFF' }))
    } catch (error) {
      console.error('❌ LỖI khi cập nhật database:', error)
    }
    
    setDisabledFeatures([...disabledFeatures, id]) // Dùng disabledFeatures thay vì dismissedAlerts
    setDismissedAlerts([...dismissedAlerts, id]) // Ngăn popup
    // Reset trạng thái đã đọc để có thể đọc lại khi bật lại
    setHasSpokenAlert(prev => ({ ...prev, [id]: false }))
    
    // Reset flag sau 6 giây (dài hơn polling interval 5s)
    setTimeout(() => setManualToggleInProgress(false), 6000)
  }

  const handleEnableStatus = async (id) => {
    console.log('💾 NÚT BẬT - Đang cập nhật database:', id)
    
    // Đánh dấu là thay đổi thủ công - KHÔNG hiện popup
    setManualToggleInProgress(true)
    
    // Update database to turn ON
    try {
      await axios.post('/api/sensors/update', {
        sensor: id,
        value: 'ON'
      })
      console.log(`✅ ĐÃ CẬP NHẬT database - Turned ON ${id}`)
      
      // Cập nhật lastRemoteValues để không popup khi poll
      setLastRemoteValues(prev => ({ ...prev, [id]: 'ON' }))
      
      // Remove from disabled list để hiện trạng thái ON
      setDisabledFeatures(disabledFeatures.filter(item => item !== id))
      setDismissedAlerts(dismissedAlerts.filter(item => item !== id))
    } catch (error) {
      console.error('❌ LỖI khi cập nhật database:', error)
    }
    
    // Reset flag sau 6 giây (dài hơn polling interval 5s)
    setTimeout(() => setManualToggleInProgress(false), 6000)
  }

  useEffect(() => {
    fetchLatestData()
    // Giảm polling từ 5s → 10s để tiết kiệm tài nguyên trên Raspberry Pi
    const interval = setInterval(fetchLatestData, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Poll remote triggers mỗi 5 giây (giảm từ 2s để phù hợp Raspberry Pi)
    const checkTriggers = async () => {
      try {
        const response = await axios.get('/api/check-remote-trigger')
        const { triggers } = response.data
        
        if (triggers && triggers.length > 0) {
          console.log(`📡 [USER MODE] Received ${triggers.length} remote triggers:`, triggers)
          
          for (const trigger of triggers) {
            const { sensor, value } = trigger
            
            // Popup khi ĐỦ TẤT CẢ CÁC ĐIỀU KIỆN:
            // 1. Nhận được JSON yêu cầu ON từ remote
            // 2. Chức năng cảnh báo đang BẬT (ON) trong database TRƯỚC KHI nhận POST
            // 3. Chưa bị dismiss
            // 4. Không đang trong quá trình toggle thủ công
            
            // Lấy giá trị TRƯỚC khi POST request thay đổi database
            const wasAlreadyOn = String(latestData[sensor]?.value || '').toUpperCase() === 'ON'
            
            if (sensor === 'fire_alarm' && value === 'ON' 
                && wasAlreadyOn
                && !dismissedAlerts.includes('fire_alarm')
                && !manualToggleInProgress) {
              
              console.log('🔥 [USER MODE] FIRE ALARM TRIGGERED - All conditions met:', {
                remoteJSON: value,
                wasAlreadyOn: wasAlreadyOn,
                currentDBStatus: latestData.fire_alarm?.value,
                dismissed: dismissedAlerts.includes('fire_alarm'),
                manualToggle: manualToggleInProgress
              })
              setActiveAlert({
                id: 'fire_alarm',
                severity: 'critical',
                icon: '🔥',
                title: 'CẢNH BÁO CHÁY',
                message: 'Phát hiện có cháy! Vui lòng kiểm tra ngay!',
                canDismiss: true // USER MODE - CÓ nút đóng
              })
              speakAlert('Cảnh báo cháy! Phát hiện có lửa! Vui lòng kiểm tra ngay!', 'fire_alarm')
            } else if (sensor === 'fire_alarm' && value === 'ON') {
              console.log('🚫 [USER MODE] FIRE ALARM NOT TRIGGERED - Conditions not met:', {
                remoteJSON: value,
                wasAlreadyOn: wasAlreadyOn,
                currentDBStatus: latestData.fire_alarm?.value,
                dismissed: dismissedAlerts.includes('fire_alarm'),
                manualToggle: manualToggleInProgress,
                reason: !wasAlreadyOn ? 'Chức năng đang TẮT' : 'Điều kiện khác không đủ'
              })
            }
            
            if (sensor === 'thieves_alarm' && value === 'ON'
                && wasAlreadyOn
                && !dismissedAlerts.includes('thieves_alarm')
                && !manualToggleInProgress) {
              
              console.log('🚨 [USER MODE] THIEVES ALARM TRIGGERED - All conditions met:', {
                remoteJSON: value,
                wasAlreadyOn: wasAlreadyOn,
                currentDBStatus: latestData.thieves_alarm?.value,
                dismissed: dismissedAlerts.includes('thieves_alarm'),
                manualToggle: manualToggleInProgress
              })
              setActiveAlert({
                id: 'thieves_alarm',
                severity: 'critical',
                icon: '🚨',
                title: 'CẢNH BÁO XÂM NHẬP',
                message: 'Phát hiện có trộm! Cảnh báo an ninh!',
                canDismiss: true // USER MODE - CÓ nút đóng
              })
              speakAlert('Cảnh báo xâm nhập! Phát hiện có trộm! Cảnh báo an ninh!', 'thieves_alarm')
            } else if (sensor === 'thieves_alarm' && value === 'ON') {
              console.log('🚫 [USER MODE] THIEVES ALARM NOT TRIGGERED - Conditions not met:', {
                remoteJSON: value,
                wasAlreadyOn: wasAlreadyOn,
                currentDBStatus: latestData.thieves_alarm?.value,
                dismissed: dismissedAlerts.includes('thieves_alarm'),
                manualToggle: manualToggleInProgress,
                reason: !wasAlreadyOn ? 'Chức năng đang TẮT' : 'Điều kiện khác không đủ'
              })
            }
          }
        }
      } catch (error) {
        // Bỏ qua lỗi, endpoint này không quan trọng
        console.debug('[USER MODE] Remote trigger check failed:', error.message)
      }
    }
    
    checkTriggers() // Call immediately
    const interval = setInterval(checkTriggers, 5000)
    return () => clearInterval(interval)
  }, [latestData, dismissedAlerts, manualToggleInProgress])

  return (
    <>
      <Head>
        <title>User Mode - Smart Robot Dashboard</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
        {/* Alert Popup */}
        {activeAlert && (
          <AlertPopup
            alert={activeAlert}
            onDismiss={handleDismissAlert}
            canDismiss={activeAlert.canDismiss}
          />
        )}

        {/* Header */}
        <header className="bg-white/30 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-2 py-2">
            <div className="flex items-center justify-center">
              <h1 className="text-lg font-bold text-white">👤 USER MODE</h1>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-2 py-2">
          {/* Sensors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
            <SimpleSensorCard
              title="Nhiệt độ"
              value={latestData.temperature_sensor?.value || '--'}
              unit="°C"
            />
            <SimpleSensorCard
              title="Độ ẩm"
              value={latestData.humidity?.value || '--'}
              unit="%"
            />
            <SimpleSensorCard
              title="Ánh sáng"
              value={latestData.light_sensor?.value || '--'}
              unit="lux"
            />
            <SimpleSensorCard
              title="Bụi mịn"
              value={latestData.dust_sensor?.value || '--'}
              unit="ppm"
            />
          </div>

          {/* Status Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
            <SimpleStatusBox
              title="Báo cháy"
              isActive={String(latestData.fire_alarm?.value || '').toUpperCase() === 'ON' && !disabledFeatures.includes('fire_alarm')}
              canDismiss={true}
              onDismiss={() => handleDismissStatus('fire_alarm')}
              onEnable={() => handleEnableStatus('fire_alarm')}
            />
            <SimpleStatusBox
              title="Báo trộm"
              isActive={String(latestData.thieves_alarm?.value || '').toUpperCase() === 'ON' && !disabledFeatures.includes('thieves_alarm')}
              canDismiss={true}
              onDismiss={() => handleDismissStatus('thieves_alarm')}
              onEnable={() => handleEnableStatus('thieves_alarm')}
            />
            <SimpleStatusBox
              title="Xông tinh dầu"
              isActive={String(latestData.humidity_sensor?.value || '').toUpperCase() === 'ON' && !disabledFeatures.includes('humidity_sensor')}
              canDismiss={true}
              onDismiss={() => handleDismissStatus('humidity_sensor')}
              onEnable={() => handleEnableStatus('humidity_sensor')}
            />
            <SimpleStatusBox
              title="Nhảy theo nhạc"
              isActive={String(latestData.sound_dance_sensor?.value || '').toUpperCase() === 'ON' && !disabledFeatures.includes('sound_dance_sensor')}
              canDismiss={true}
              onDismiss={() => handleDismissStatus('sound_dance_sensor')}
              onEnable={() => handleEnableStatus('sound_dance_sensor')}
            />
            <SimpleStatusBox
              title="Nhảy theo ánh sáng"
              isActive={String(latestData.light_dance_sensor?.value || '').toUpperCase() === 'ON' && !disabledFeatures.includes('light_dance_sensor')}
              canDismiss={true}
              onDismiss={() => handleDismissStatus('light_dance_sensor')}
              onEnable={() => handleEnableStatus('light_dance_sensor')}
            />
          </div>

          {/* Video Stream */}
          <div className="mb-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2">
                <h2 className="text-white font-bold text-center">📹 Camera Stream</h2>
              </div>
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://ionogenic-uncollectible-miesha.ngrok-free.dev/"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  title="Robot Camera Stream"
                />
              </div>
            </div>
          </div>

          {/* Chat Box */}
          <ChatBox sensorData={latestData} />
        </div>
      </div>
    </>
  )
}
