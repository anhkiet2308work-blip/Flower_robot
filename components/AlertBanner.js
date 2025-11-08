import { useEffect, useState } from 'react'

export default function AlertBanner({ type, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto dismiss after 10 seconds for non-critical alerts
    if (type !== 'critical') {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 10000)
      
      return () => clearTimeout(timer)
    }
  }, [type, onClose])

  if (!isVisible) return null

  const styles = {
    critical: {
      bg: 'bg-red-600',
      border: 'border-red-700',
      text: 'text-white',
      icon: '🚨',
      animation: 'animate-pulse'
    },
    warning: {
      bg: 'bg-yellow-500',
      border: 'border-yellow-600',
      text: 'text-gray-900',
      icon: '⚠️',
      animation: ''
    },
    info: {
      bg: 'bg-blue-500',
      border: 'border-blue-600',
      text: 'text-white',
      icon: 'ℹ️',
      animation: ''
    },
    success: {
      bg: 'bg-green-500',
      border: 'border-green-600',
      text: 'text-white',
      icon: '✅',
      animation: ''
    }
  }

  const style = styles[type] || styles.info

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`${style.bg} ${style.border} ${style.text} ${style.animation} rounded-lg shadow-2xl border-2 p-4 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{style.icon}</span>
          <div>
            <p className="font-bold text-lg">{message}</p>
            {type === 'critical' && (
              <p className="text-sm opacity-90 mt-1">Vui lòng kiểm tra ngay!</p>
            )}
          </div>
        </div>
        
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className={`ml-4 p-2 rounded-full hover:bg-white/20 transition-colors`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
