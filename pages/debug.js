import Head from 'next/head'

export default function DebugPage() {
  return (
    <>
      <Head>
        <title>Debug - Environment Check</title>
      </Head>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">🔍 Environment Debug Page</h1>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Public Environment Variables (Client-side)</h2>
              <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                <p className="mb-2">
                  <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{' '}
                  <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
                    {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not Set'}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{' '}
                  <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
                    {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not Set'}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Test API Endpoint</h2>
              <a 
                href="/api/sensors/latest" 
                target="_blank"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Test /api/sensors/latest
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Opens API endpoint in new tab. Check if it returns data or error message.
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Check if environment variables show ✅ Set</li>
                <li>Click "Test /api/sensors/latest" button</li>
                <li>If you see JSON data → Environment is OK</li>
                <li>If you see error → Check Vercel env variables</li>
                <li>Open browser Console (F12) to see detailed logs</li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
              <div className="space-x-4">
                <a href="/robot" className="text-blue-600 hover:underline">→ Robot Mode</a>
                <a href="/user" className="text-blue-600 hover:underline">→ User Mode</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // This runs on server - check server-side env vars
  const serverCheck = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL || !!process.env.SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !!process.env.SUPABASE_ANON_KEY,
    openaiKey: !!process.env.OPENAI_API_KEY,
  }

  console.log('🔍 Server-side env check:', serverCheck)

  return {
    props: {},
  }
}
