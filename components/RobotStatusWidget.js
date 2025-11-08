export default function RobotStatusWidget({ latestData }) {
  const isRobotActive = 
    latestData.sound_dance_sensor?.value === 'ON' || 
    latestData.light_dance_sensor?.value === 'ON'

  const hasAlert = 
    latestData.fire_alarm?.value === 'ON' || 
    latestData.thieves_alarm?.value === 'ON'

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/80 to-indigo-600/80 rounded-2xl shadow-xl p-6 text-white border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Trạng thái Robot</h3>
        <div className={`w-4 h-4 rounded-full shadow-lg ${
          hasAlert ? 'bg-red-400 animate-pulse' : 
          isRobotActive ? 'bg-green-400 animate-pulse' : 
          'bg-gray-300'
        }`} />
      </div>

      {/* Robot Animation */}
      <div className="flex justify-center my-6">
        <div className={`text-8xl transition-transform duration-500 ${
          isRobotActive ? 'animate-bounce' : ''
        } ${hasAlert ? 'animate-pulse' : ''}`}>
          🤖
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        {hasAlert ? (
          <>
            <p className="text-2xl font-bold animate-pulse">⚠️ CẢNH BÁO!</p>
            {latestData.fire_alarm?.value === 'ON' && (
              <p className="text-lg">🔥 Phát hiện cháy!</p>
            )}
            {latestData.thieves_alarm?.value === 'ON' && (
              <p className="text-lg">🚨 Phát hiện xâm nhập!</p>
            )}
          </>
        ) : isRobotActive ? (
          <>
            <p className="text-2xl font-bold">💃 Đang hoạt động</p>
            {latestData.sound_dance_sensor?.value === 'ON' && (
              <p className="text-lg">🎵 Nhảy theo nhạc</p>
            )}
            {latestData.light_dance_sensor?.value === 'ON' && (
              <p className="text-lg">💡 Nhảy theo ánh sáng</p>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">😴 Đang chờ</p>
            <p className="text-sm opacity-80">Robot đang ở chế độ chờ</p>
          </>
        )}
      </div>

      {/* Activity Indicators */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className={`p-3 rounded-xl backdrop-blur-sm ${
          latestData.sound_dance_sensor?.value === 'ON' 
            ? 'bg-green-400/40 border-2 border-green-300 shadow-lg' 
            : 'bg-white/10 border border-white/20'
        } transition-all duration-300`}>
          <div className="text-center">
            <div className="text-2xl mb-1">🎵</div>
            <div className="text-xs font-bold">Nhạc</div>
          </div>
        </div>
        
        <div className={`p-3 rounded-xl backdrop-blur-sm ${
          latestData.light_dance_sensor?.value === 'ON' 
            ? 'bg-yellow-400/40 border-2 border-yellow-300 shadow-lg' 
            : 'bg-white/10 border border-white/20'
        } transition-all duration-300`}>
          <div className="text-center">
            <div className="text-2xl mb-1">💡</div>
            <div className="text-xs font-bold">Ánh sáng</div>
          </div>
        </div>
        
        <div className={`p-3 rounded-xl backdrop-blur-sm ${
          latestData.fire_alarm?.value === 'ON' 
            ? 'bg-red-400/40 border-2 border-red-300 animate-pulse shadow-lg' 
            : 'bg-white/10 border border-white/20'
        } transition-all duration-300`}>
          <div className="text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs font-bold">Cháy</div>
          </div>
        </div>
        
        <div className={`p-3 rounded-xl backdrop-blur-sm ${
          latestData.thieves_alarm?.value === 'ON' 
            ? 'bg-red-400/40 border-2 border-red-300 animate-pulse shadow-lg' 
            : 'bg-white/10 border border-white/20'
        } transition-all duration-300`}>
          <div className="text-center">
            <div className="text-2xl mb-1">🚨</div>
            <div className="text-xs font-bold">Trộm</div>
          </div>
        </div>
      </div>
    </div>
  )
}
