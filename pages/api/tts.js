// Server-side proxy for Vietnamese TTS to avoid CORS and autoplay issues
// Supports multiple TTS providers: Google TTS (default), FPT.AI, Viettel AI
import https from 'https'
import http from 'http'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { text, lang = 'vi', provider = 'google' } = req.query

  if (!text) {
    return res.status(400).json({ message: 'Text parameter required' })
  }

  try {
    console.log(`🔊 [TTS API] Generating speech for: "${text.substring(0, 50)}..." (provider: ${provider})`)
    
    let ttsUrl
    
    switch (provider) {
      case 'viettel':
        // Viettel AI TTS (free, Vietnamese only)
        ttsUrl = `https://viettelgroup.ai/voice/api/tts/v1/rest/syn?text=${encodeURIComponent(text)}&voice=hn-quynhanh&speed=1.0&tts_return_option=2`
        break
        
      case 'fpt':
        // FPT.AI TTS (requires API key in production)
        // For demo, falling back to Google
        ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&total=1&idx=0&textlen=${text.length}&client=tw-ob&ttsspeed=0.9`
        break
        
      case 'google':
      default:
        // Google TTS (default, reliable)
        ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang || 'vi'}&total=1&idx=0&textlen=${text.length}&client=tw-ob&ttsspeed=0.9`
        break
    }

    // Fetch audio from TTS provider
    const response = await new Promise((resolve, reject) => {
      const client = ttsUrl.startsWith('https') ? https : http
      client.get(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'audio/mpeg, audio/*, */*',
          'Referer': 'https://translate.google.com/'
        }
      }, resolve).on('error', reject)
    })

    console.log(`✅ [TTS API] Audio fetched successfully (status: ${response.statusCode})`)

    // Set proper headers for audio
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Pipe audio data to response
    response.pipe(res)
  } catch (error) {
    console.error('❌ [TTS API] Error:', error)
    res.status(500).json({ message: 'TTS generation failed', error: error.message })
  }
}
