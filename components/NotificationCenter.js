import { useState, useEffect } from 'react'

export default function NotificationCenter({ notifications, onClear }) {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length)
  }, [notifications])

  const criticalNotifications = notifications.filter(n => n.severity === 'critical')
  const hasCritical = criticalNotifications.length > 0

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
          hasCritical 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl animate-pulse' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl'
        } text-white shadow-lg border border-white/30`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Badge */}
        {unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 ${
            hasCritical ? 'bg-red-600' : 'bg-orange-500'
          } text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce`}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-96 backdrop-blur-2xl bg-white/80 rounded-2xl shadow-2xl z-50 max-h-[600px] overflow-hidden border border-white/40">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-sm text-white p-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="font-bold text-lg">Thông báo hệ thống</h3>
                <p className="text-sm opacity-90">{notifications.length} thông báo</p>
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={() => onClear()}
                  className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[500px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="font-bold text-lg">Không có thông báo</p>
                  <p className="text-sm mt-1">Tất cả hoạt động đang bình thường</p>
                </div>
              ) : (
                notifications.map((notif, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border-b border-white/20 hover:bg-white/40 transition-all duration-200 ${
                      !notif.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        notif.severity === 'critical' ? 'bg-red-100' :
                        notif.severity === 'warning' ? 'bg-yellow-100' :
                        notif.severity === 'info' ? 'bg-blue-100' :
                        'bg-gray-100'
                      }`}>
                        <span className="text-xl">{notif.icon}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          notif.severity === 'critical' ? 'text-red-900' :
                          notif.severity === 'warning' ? 'text-yellow-900' :
                          'text-gray-900'
                        }`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notif.timestamp}
                        </p>
                      </div>

                      {/* Severity Badge */}
                      {notif.severity === 'critical' && (
                        <span className="flex-shrink-0 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                          KHẨN CẤP
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
