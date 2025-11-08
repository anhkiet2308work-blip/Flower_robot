export default function StatusIndicator({ title, items, color = 'green' }) {
  const colorClasses = {
    green: 'from-green-400/80 to-green-600/80',
    red: 'from-red-400/80 to-red-600/80',
    yellow: 'from-yellow-400/80 to-yellow-600/80',
    blue: 'from-blue-400/80 to-blue-600/80',
  }

  const hasActiveAlert = items.some(item => item.status === 'ON')

  return (
    <div className={`backdrop-blur-xl bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-300 ${
      color === 'red' && hasActiveAlert ? 'animate-pulse ring-2 ring-red-300' : ''
    }`}>
      <h4 className="font-bold text-white mb-4 flex items-center justify-between text-lg">
        {title}
        {color === 'red' && hasActiveAlert && (
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        )}
      </h4>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <span className="text-white font-medium">{item.label}</span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
              item.status === 'ON' 
                ? 'bg-white text-gray-900 shadow-lg animate-pulse' 
                : 'bg-white/30 text-white'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
