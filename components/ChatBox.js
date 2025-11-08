 import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function ChatBox({ sensorData }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false) // Trạng thái tắt/bật âm thanh
  const [recognition, setRecognition] = useState(null)

  // Function to speak Vietnamese text using external TTS API
  const speakVietnamese = async (text) => {
    if (typeof window === 'undefined') return
    if (isMuted) {
      console.log('🔇 [TTS] Muted - skipping speech')
      return
    }
    
    try {
      console.log('🔊 [TTS] Requesting Vietnamese TTS for:', text.substring(0, 50) + '...')
      
      // Use our API proxy for Vietnamese TTS
      const audioUrl = `/api/tts?text=${encodeURIComponent(text)}&lang=vi`
      
      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl)
        
        audio.onloadeddata = () => {
          console.log('📥 [TTS] Audio loaded successfully')
        }
        
        audio.onplay = () => {
          console.log('🔊 [TTS] Started speaking')
        }
        
        audio.onended = () => {
          console.log('✅ [TTS] Finished speaking')
          resolve()
        }
        
        audio.onerror = (e) => {
          console.error('❌ [TTS] Audio error:', e)
          reject(e)
        }
        
        // Play audio and handle promise rejection
        audio.play().catch(err => {
          console.error('❌ [TTS] Play error:', err)
          reject(err)
        })
      })
    } catch (error) {
      console.error('❌ [TTS] Failed to initialize audio:', error)
      throw error
    }
  }

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'vi-VN' // Vietnamese language
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        const newInput = transcript
        setInput(newInput)
        setIsListening(false)
        
        // Tự động gửi tin nhắn sau khi thu âm xong
        setTimeout(() => {
          if (newInput.trim()) {
            handleSendMessage(newInput)
          }
        }, 500)
      }
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói')
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const handleSendMessage = async (message) => {
    const textToSend = message || input
    if (!textToSend.trim()) return

    const userMessage = { role: 'user', content: textToSend }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', {
        message: textToSend,
        sensorData,
      })

      const botMessage = { role: 'assistant', content: response.data.reply }
      setMessages(prev => [...prev, botMessage])
      
      // Đọc tin nhắn bot bằng tiếng Việt - LUÔN CHỜ AUDIO LOAD XONG
      try {
        await speakVietnamese(response.data.reply)
      } catch (ttsError) {
        console.error('❌ [TTS] Không thể phát giọng nói:', ttsError)
        // Không cần hiện lỗi cho user, chỉ log ra console
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = { 
        role: 'assistant', 
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = () => {
    handleSendMessage(input)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 md:p-8 flex flex-col h-[500px] sm:h-[600px] border border-white/20">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-6 flex items-center">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="truncate">Chat với Robot AI</span>
      </h3>
      
      <div className="flex-1 overflow-y-auto mb-3 sm:mb-6 space-y-2 sm:space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-600 mt-8 sm:mt-16">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🤖</div>
            <p className="text-base sm:text-xl font-bold px-2">Xin chào! Tôi là trợ lý AI của robot.</p>
            <p className="text-sm sm:text-base mt-2 sm:mt-3 px-4">Hãy hỏi tôi về dữ liệu cảm biến, thời tiết, hoặc điều khiển robot!</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-3 shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/90 text-gray-800 border border-white/40'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-1 sm:gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập hoặc nhấn mic..."
          className="flex-1 backdrop-blur-sm bg-white/50 border border-white/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          disabled={loading}
        />
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`px-2 sm:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base ${
            isMuted 
              ? 'bg-red-100 text-red-600 border-2 border-red-300' 
              : 'bg-green-100 text-green-600 border-2 border-green-300'
          }`}
          title={isMuted ? 'Âm thanh đã tắt' : 'Âm thanh đang bật'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <button
          onClick={toggleListening}
          disabled={loading}
          className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-white/70 text-gray-700 hover:bg-white'
          }`}
          title={isListening ? 'Đang nghe...' : 'Nhấn để nói'}
        >
          {isListening ? (
            <span className="hidden sm:inline">🎤 Đang nghe...</span>
          ) : (
            '🎤'
          )}
          {isListening && <span className="sm:hidden">🎤</span>}
        </button>
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm sm:text-base whitespace-nowrap"
        >
          Gửi
        </button>
      </div>
    </div>
  )
}
