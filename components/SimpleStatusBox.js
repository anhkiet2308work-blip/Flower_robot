export default function SimpleStatusBox({ title, isActive, onDismiss, onEnable, canDismiss = true }) {
  // Màu riêng cho từng chức năng
  const getActiveColor = () => {
    switch(title) {
      case 'Báo cháy':
      case 'Báo trộm':
        return 'bg-red-500 text-white' // Đỏ - CẢNH BÁO
      case 'Xông tinh dầu':
        return 'bg-green-500 text-white' // Xanh lá
      case 'Nhảy theo nhạc':
        return 'bg-purple-500 text-white' // Tím
      case 'Nhảy theo ánh sáng':
        return 'bg-yellow-500 text-white' // Vàng
      default:
        return 'bg-blue-500 text-white'
    }
  }

  return (
    <div className={`rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 ${
      isActive ? getActiveColor() : 'bg-gray-300 text-gray-600'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm sm:text-base truncate">{title}</h3>
          <span className="text-xs sm:text-sm">{isActive ? 'ON' : 'OFF'}</span>
        </div>
        
        {/* When active - show turn OFF button */}
        {isActive && canDismiss && onDismiss && (
          <button
            onClick={onDismiss}
            className="bg-white text-gray-900 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold hover:bg-gray-100 whitespace-nowrap"
          >
            Tắt
          </button>
        )}
        
        {/* When active but locked */}
        {isActive && !canDismiss && (
          <span className="text-xs opacity-80 whitespace-nowrap">🔒 Khóa</span>
        )}
        
        {/* When inactive - show turn ON button */}
        {!isActive && canDismiss && onEnable && (
          <button
            onClick={onEnable}
            className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold hover:bg-green-600 whitespace-nowrap"
          >
            Bật
          </button>
        )}
      </div>
    </div>
  )
}
