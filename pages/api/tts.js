// Server-side proxy for Google TTS to avoid CORS and autoplay issues
import https from 'https'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { text } = req.query

  if (!text) {
    return res.status(400).json({ message: 'Text parameter required' })
  }

  try {
    const encodedText = encodeURIComponent(text)
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=vi&total=1&idx=0&textlen=${text.length}&client=tw-ob&ttsspeed=0.9`

    // Fetch audio from Google TTS
    const response = await new Promise((resolve, reject) => {
      https.get(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, resolve).on('error', reject)
    })

    // Set proper headers for audio
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Pipe audio data to response
    response.pipe(res)
  } catch (error) {
    console.error('TTS proxy error:', error)
    res.status(500).json({ message: 'TTS generation failed', error: error.message })
  }
}
