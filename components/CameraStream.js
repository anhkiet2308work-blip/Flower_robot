export default function CameraStream({ streamUrl }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        📹 Camera Trực Tiếp
      </h3>
      
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
        {streamUrl ? (
          <iframe
            src={streamUrl}
            className="w-full h-full"
            allow="camera; microphone"
            title="Camera Stream"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📷</div>
              <p>Chưa có nguồn camera</p>
              <p className="text-sm mt-2">Vui lòng kết nối camera</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
