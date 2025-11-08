export default function RobotStatusBox({ title, icon, isActive, type }) {
  const getAnimation = () => {
    if (!isActive) return ''
    
    switch(type) {
      case 'fire':
        return 'animate-pulse'
      case 'thieves':
        return 'animate-pulse'
      case 'diffuser':
        return 'animate-pulse'
      case 'music':
        return '' // No bounce animation
      case 'light':
        return 'animate-pulse'
      default:
        return ''
    }
  }

  const getGradient = () => {
    switch(type) {
      case 'fire':
        return isActive ? 'from-red-400/90 to-orange-600/90' : 'from-gray-400/70 to-gray-600/70'
      case 'thieves':
        return isActive ? 'from-red-500/90 to-red-700/90' : 'from-gray-400/70 to-gray-600/70'
      case 'diffuser':
        return isActive ? 'from-green-400/90 to-emerald-600/90' : 'from-gray-400/70 to-gray-600/70'
      case 'music':
        return isActive ? 'from-purple-400/90 to-pink-600/90' : 'from-gray-400/70 to-gray-600/70'
      case 'light':
        return isActive ? 'from-yellow-400/90 to-amber-600/90' : 'from-gray-400/70 to-gray-600/70'
      default:
        return 'from-gray-400/70 to-gray-600/70'
    }
  }

  const getEffect = () => {
    if (!isActive) return null
    
    switch(type) {
      case 'fire':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Fire flames - multiple layers */}
            <div className="fire-container absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full">
              {/* Main flame */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-xl animate-flame"></div>
              <div className="absolute bottom-2 left-1/3 w-12 h-20 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full blur-lg animate-flame" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-1 right-1/3 w-14 h-22 bg-gradient-to-t from-orange-700 via-orange-400 to-yellow-200 rounded-full blur-xl animate-flame" style={{ animationDelay: '0.6s' }}></div>
              
              {/* THICK VISIBLE SMOKE - Multiple layers */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gray-800 rounded-full blur-3xl animate-smoke opacity-60"></div>
              <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gray-700 rounded-full blur-3xl animate-smoke opacity-55" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-24 right-1/3 w-30 h-30 bg-gray-900 rounded-full blur-3xl animate-smoke opacity-50" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute bottom-28 left-2/5 w-26 h-26 bg-black/40 rounded-full blur-2xl animate-smoke opacity-45" style={{ animationDelay: '1.2s' }}></div>
              
              {/* Additional smoke clouds */}
              <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gray-600/70 rounded-full blur-xl animate-smoke-slow"></div>
              <div className="absolute bottom-22 right-1/4 w-24 h-24 bg-gray-700/60 rounded-full blur-2xl animate-smoke-slow" style={{ animationDelay: '0.6s' }}></div>
              
              {/* Fire particles */}
              <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-spark"></div>
              <div className="absolute bottom-8 right-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-spark" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )
      case 'thieves':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Police siren lights */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-red-500 opacity-30 animate-siren-left"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500 opacity-30 animate-siren-right"></div>
            
            {/* Thief icon - masked person silhouette */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="relative">
                {/* Head with mask */}
                <div className="w-16 h-16 bg-black rounded-full relative animate-sway">
                  {/* Eyes */}
                  <div className="absolute top-6 left-3 w-2 h-3 bg-white rounded-full"></div>
                  <div className="absolute top-6 right-3 w-2 h-3 bg-white rounded-full"></div>
                  {/* Mask */}
                  <div className="absolute bottom-4 left-2 right-2 h-6 bg-black border-t-2 border-white"></div>
                </div>
                {/* Body */}
                <div className="w-12 h-8 bg-black mx-auto rounded-t-lg"></div>
              </div>
            </div>
            
            {/* Warning flashes */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-400 rounded-full animate-flash"></div>
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-flash" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-400 rounded-full animate-flash" style={{ animationDelay: '0.6s' }}></div>
            
            {/* Alert waves */}
            <div className="absolute inset-0 border-2 border-red-400 rounded-2xl animate-ping"></div>
          </div>
        )
      case 'diffuser':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Essential oil mist */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-green-300 rounded-full blur-3xl animate-mist opacity-40"></div>
            <div className="absolute bottom-4 left-1/3 w-24 h-24 bg-emerald-300 rounded-full blur-2xl animate-mist opacity-35" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-2 right-1/3 w-28 h-28 bg-teal-300 rounded-full blur-3xl animate-mist opacity-30" style={{ animationDelay: '1s' }}></div>
            
            {/* Sparkles in mist */}
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full animate-sparkle"></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-green-100 rounded-full animate-sparkle" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-emerald-100 rounded-full animate-sparkle" style={{ animationDelay: '0.8s' }}></div>
          </div>
        )
      case 'light':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Sun rays effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse opacity-40"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Light rays shooting */}
            <div className="absolute top-1/4 right-0 w-full h-0.5 bg-gradient-to-l from-yellow-300 to-transparent animate-lightray"></div>
            <div className="absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-l from-yellow-400 to-transparent animate-lightray" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-3/4 right-0 w-full h-0.5 bg-gradient-to-l from-yellow-200 to-transparent animate-lightray" style={{ animationDelay: '0.6s' }}></div>
            
            {/* Sparkles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-sparkle"></div>
            <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-sparkle" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '0.7s' }}></div>
          </div>
        )
      case 'music':
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-2 h-8 bg-white rounded-full mx-1 animate-bounce"></div>
            <div className="w-2 h-12 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-10 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-14 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-9 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`relative backdrop-blur-xl bg-gradient-to-br ${getGradient()} rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 ${
      isActive ? 'ring-2 ring-white shadow-2xl ' + getAnimation() : ''
    }`}>
      {getEffect()}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-4xl">{icon}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isActive ? 'bg-white text-gray-900' : 'bg-gray-800/50 text-white'
          }`}>
            {isActive ? 'ON' : 'OFF'}
          </span>
        </div>
        
        <h3 className="text-white font-bold text-lg">{title}</h3>
        
        {isActive && (
          <p className="text-white/90 text-sm mt-2 font-medium">
            {type === 'fire' && '🔥 Cảnh báo có cháy!'}
            {type === 'thieves' && '🚨 Cảnh báo có trộm!'}
            {type === 'diffuser' && '🌿 Đang xông tinh dầu'}
            {type === 'music' && '🎵 Robot đang nhảy theo nhạc'}
            {type === 'light' && '💡 Robot đang nhảy theo ánh sáng'}
          </p>
        )}
      </div>
    </div>
  )
}
