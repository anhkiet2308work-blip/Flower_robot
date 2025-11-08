// API Test - Check Supabase connection
import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  const envCheck = {
    url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
  }

  console.log('🔍 Environment Check:', envCheck)

  if (!supabase) {
    return res.status(500).json({
      success: false,
      message: 'Supabase client is not initialized',
      envCheck,
      hint: 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel Environment Variables'
    })
  }

  try {
    // Test query - try to fetch from fire_alarm table
    console.log('🔍 Testing query to fire_alarm table...')
    const { data, error, status, statusText } = await supabase
      .from('fire_alarm')
      .select('*')
      .limit(1)

    console.log('📊 Query result:', { 
      hasData: !!data, 
      dataLength: data?.length,
      error: error?.message,
      status,
      statusText
    })

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Database query failed',
        error: error.message,
        details: error,
        envCheck
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase connection successful',
      testData: data,
      envCheck
    })
  } catch (err) {
    console.error('❌ Test failed:', err)
    return res.status(500).json({
      success: false,
      message: 'Connection test failed',
      error: err.message,
      envCheck
    })
  }
}
