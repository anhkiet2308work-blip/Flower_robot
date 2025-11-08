export default function AlertPopup({ alert, onDismiss, canDismiss = true }) {
  if (!alert) return null

  const getSeverityColor = () => {
    switch(alert.severity) {
      case 'critical':
        return 'bg-red-500'
      case 'warning':
        return 'bg-orange-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Alert Box - Đơn giản chỉ có chữ và khung đỏ */}
      <div className={`relative ${getSeverityColor()} text-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slideUp`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{alert.title}</h2>
          <p className="text-xl mb-6">{alert.message}</p>
          
          {canDismiss && (
            <button
              onClick={onDismiss}
              className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
            >
              Đóng cảnh báo
            </button>
          )}
          
          {!canDismiss && (
            <p className="text-sm opacity-80">⚠️ Cảnh báo này cần xác nhận từ người dùng</p>
          )}
        </div>
      </div>
    </div>
  )
}
