export default function SensorCard({ title, value, unit, icon, status, color = 'blue', statusMessage }) {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    yellow: 'from-yellow-400 to-yellow-600',
    red: 'from-red-400 to-red-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
  }

  // Only animate for ON/OFF status sensors
  const hasStatus = status !== undefined
  const isActive = String(status || '').toUpperCase() === 'ON'
  
  return (
    <div className={`relative backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 ${
      isActive ? 'ring-2 ring-green-400 animate-pulse' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-br ${colorClasses[color]} text-white p-3 rounded-xl shadow-lg`}>
          {icon}
        </div>
        {hasStatus && (
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg animate-pulse' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {status}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {value}
        </span>
        {unit && <span className="ml-2 text-gray-500 text-lg">{unit}</span>}
      </div>
      
      {/* Status message when ON */}
      {isActive && statusMessage && (
        <p className="mt-3 text-sm font-semibold text-green-600 bg-green-50 rounded-lg px-3 py-2">
          {statusMessage}
        </p>
      )}
    </div>
  )
}
