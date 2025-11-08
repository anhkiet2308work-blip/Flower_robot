import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

export default function SensorChart({ data, dataKey, title, color = '#3b82f6', yAxisLabel }) {
  // Handle both formats: with ts (from API) or with time (static fake data)
  const formattedData = data?.map(item => ({
    ...item,
    time: item.time || (item.ts ? format(new Date(item.ts), 'HH:mm') : ''),
  })) || []

  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="time" 
            stroke="#666"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            stroke="#666"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3}
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 7, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
