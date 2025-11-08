import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set')
    return res.status(500).json({ message: 'OpenAI API not configured' })
  }

  try {
    const { message, sensorData } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    // Mock weather data for all 63 Vietnam provinces
    const weatherData = {
      // Miền Bắc - Đồng bằng sông Hồng
      'hà nội': {
        today: { temp: '24-32°C', condition: 'Nắng gián đoạn', humidity: '60-75%', wind: 'Đông Nam 10km/h' },
        tomorrow: { temp: '25-33°C', condition: 'Nắng nóng, ít mây', humidity: '55-70%', wind: 'Đông 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng, có lúc có mưa. Nhiệt độ 25-34°C'
      },
      'hải phòng': {
        today: { temp: '26-31°C', condition: 'Nắng, có mây', humidity: '70-80%', wind: 'Đông Nam 15km/h' },
        tomorrow: { temp: '26-32°C', condition: 'Nắng nhẹ, có mây rải rác', humidity: '65-80%', wind: 'Đông Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng ấm, gió biển. Nhiệt độ 26-32°C'
      },
      'hải dương': {
        today: { temp: '25-32°C', condition: 'Nắng, có mây', humidity: '65-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '26-33°C', condition: 'Nắng nóng', humidity: '60-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng ban ngày. Nhiệt độ 25-33°C'
      },
      'hưng yên': {
        today: { temp: '24-32°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '25-33°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 24-33°C'
      },
      'hà nam': {
        today: { temp: '25-33°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 25-34°C'
      },
      'nam định': {
        today: { temp: '25-32°C', condition: 'Nắng, có mây', humidity: '65-75%', wind: 'Đông 10-15km/h' },
        tomorrow: { temp: '26-33°C', condition: 'Nắng nóng', humidity: '60-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 25-33°C'
      },
      'thái bình': {
        today: { temp: '25-32°C', condition: 'Nắng, có mây', humidity: '65-75%', wind: 'Đông 10-15km/h' },
        tomorrow: { temp: '26-33°C', condition: 'Nắng', humidity: '60-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng đẹp. Nhiệt độ 25-33°C'
      },
      'ninh bình': {
        today: { temp: '25-33°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng, thích hợp du lịch. Nhiệt độ 25-34°C'
      },
      'vĩnh phúc': {
        today: { temp: '24-32°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '25-33°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 24-33°C'
      },
      'bắc ninh': {
        today: { temp: '24-32°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '25-33°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 24-33°C'
      },
      'quảng ninh': {
        today: { temp: '25-31°C', condition: 'Nắng, có mây', humidity: '70-80%', wind: 'Đông Nam 15km/h' },
        tomorrow: { temp: '26-32°C', condition: 'Nắng đẹp', humidity: '65-75%', wind: 'Đông Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng đẹp, thích hợp du lịch vịnh. Nhiệt độ 25-32°C'
      },

      // Miền Bắc - Trung du và miền núi
      'hà giang': {
        today: { temp: '20-28°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '21-29°C', condition: 'Nắng ấm', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, mát mẻ về đêm. Nhiệt độ 20-29°C'
      },
      'cao bằng': {
        today: { temp: '22-29°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '23-30°C', condition: 'Nắng ấm', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm. Nhiệt độ 22-30°C'
      },
      'lào cai': {
        today: { temp: '21-29°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10-15km/h' },
        tomorrow: { temp: '22-30°C', condition: 'Nắng ấm', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, sương mù sáng sớm. Nhiệt độ 21-30°C'
      },
      'bắc kạn': {
        today: { temp: '22-30°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '23-31°C', condition: 'Nắng ấm', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm. Nhiệt độ 22-31°C'
      },
      'tuyên quang': {
        today: { temp: '23-31°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '24-32°C', condition: 'Nắng ấm', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm. Nhiệt độ 23-32°C'
      },
      'lạng sơn': {
        today: { temp: '23-31°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '24-32°C', condition: 'Nắng', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng đẹp. Nhiệt độ 23-32°C'
      },
      'thái nguyên': {
        today: { temp: '23-31°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '24-32°C', condition: 'Nắng', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng đẹp. Nhiệt độ 23-32°C'
      },
      'yên bái': {
        today: { temp: '22-30°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '23-31°C', condition: 'Nắng ấm', humidity: '55-70%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, có sương mù sáng. Nhiệt độ 22-31°C'
      },
      'phú thọ': {
        today: { temp: '24-32°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '25-33°C', condition: 'Nắng nóng', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 24-33°C'
      },
      'bắc giang': {
        today: { temp: '24-32°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '25-33°C', condition: 'Nắng', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng đẹp. Nhiệt độ 24-33°C'
      },
      'sơn la': {
        today: { temp: '21-30°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Tây 10km/h' },
        tomorrow: { temp: '22-31°C', condition: 'Nắng ấm', humidity: '55-70%', wind: 'Tây Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, mát về đêm. Nhiệt độ 21-31°C'
      },
      'điện biên': {
        today: { temp: '20-31°C', condition: 'Nắng, có mây', humidity: '55-70%', wind: 'Tây 10-15km/h' },
        tomorrow: { temp: '21-32°C', condition: 'Nắng ấm', humidity: '50-65%', wind: 'Tây Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, khô ráo. Nhiệt độ 20-32°C'
      },
      'lai châu': {
        today: { temp: '19-29°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Tây 10km/h' },
        tomorrow: { temp: '20-30°C', condition: 'Nắng ấm', humidity: '55-70%', wind: 'Tây Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, có sương mù sáng. Nhiệt độ 19-30°C'
      },
      'hòa bình': {
        today: { temp: '23-32°C', condition: 'Nắng, có mây', humidity: '60-70%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '24-33°C', condition: 'Nắng nóng', humidity: '55-65%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 23-33°C'
      },

      // Miền Trung - Bắc Trung Bộ
      'thanh hóa': {
        today: { temp: '25-34°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '26-35°C', condition: 'Nắng nóng gay gắt', humidity: '50-65%', wind: 'Tây Nam 15-20km/h' },
        forecast: 'Tuần tới: Nắng nóng, khô hanh. Nhiệt độ 25-35°C'
      },
      'nghệ an': {
        today: { temp: '26-35°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-36°C', condition: 'Nắng nóng gay gắt', humidity: '50-65%', wind: 'Tây Nam 15-20km/h' },
        forecast: 'Tuần tới: Nắng nóng gay gắt. Nhiệt độ 26-36°C'
      },
      'hà tĩnh': {
        today: { temp: '26-36°C', condition: 'Nắng nóng gay gắt', humidity: '50-65%', wind: 'Tây Nam 15-20km/h' },
        tomorrow: { temp: '27-37°C', condition: 'Nắng nóng đặc biệt gay gắt', humidity: '45-60%', wind: 'Tây Nam 20km/h' },
        forecast: 'Tuần tới: Nắng nóng đặc biệt gay gắt, gió Lào. Nhiệt độ 26-37°C'
      },
      'quảng bình': {
        today: { temp: '26-35°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-36°C', condition: 'Nắng nóng gay gắt', humidity: '50-65%', wind: 'Tây Nam 15-20km/h' },
        forecast: 'Tuần tới: Nắng nóng, thích hợp tham quan động Phong Nha. Nhiệt độ 26-36°C'
      },
      'quảng trị': {
        today: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '60-75%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-35°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Tây Nam 15km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 26-35°C'
      },
      'thừa thiên huế': {
        today: { temp: '25-33°C', condition: 'Nắng, có mây', humidity: '65-80%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '60-75%', wind: 'Tây Nam 15km/h' },
        forecast: 'Tuần tới: Nắng nóng, thích hợp tham quan cố đô. Nhiệt độ 25-34°C'
      },

      // Miền Trung - Duyên hải Nam Trung Bộ
      'đà nẵng': {
        today: { temp: '25-32°C', condition: 'Nắng đẹp, ít mây', humidity: '65-80%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '26-33°C', condition: 'Nắng, có mây vài nơi', humidity: '60-75%', wind: 'Tây Nam 10-20km/h' },
        forecast: 'Tuần tới: Nắng đẹp, thích hợp du lịch. Nhiệt độ 25-32°C'
      },
      'quảng nam': {
        today: { temp: '25-33°C', condition: 'Nắng, có mây', humidity: '65-80%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '60-75%', wind: 'Tây Nam 15km/h' },
        forecast: 'Tuần tới: Nắng nóng, thích hợp tham quan Hội An. Nhiệt độ 25-34°C'
      },
      'quảng ngãi': {
        today: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '60-75%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-35°C', condition: 'Nắng nóng gay gắt', humidity: '55-70%', wind: 'Tây Nam 15-20km/h' },
        forecast: 'Tuần tới: Nắng nóng. Nhiệt độ 26-35°C'
      },
      'bình định': {
        today: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '60-75%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-35°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Tây Nam 15km/h' },
        forecast: 'Tuần tới: Nắng nóng, biển đẹp. Nhiệt độ 26-35°C'
      },
      'phú yên': {
        today: { temp: '26-33°C', condition: 'Nắng, có mây', humidity: '65-80%', wind: 'Đông Nam 15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng nóng', humidity: '60-75%', wind: 'Đông Nam 15km/h' },
        forecast: 'Tuần tới: Nắng đẹp, thích hợp tắm biển. Nhiệt độ 26-34°C'
      },
      'khánh hòa': {
        today: { temp: '26-33°C', condition: 'Nắng đẹp', humidity: '65-80%', wind: 'Đông Nam 15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, có mây', humidity: '60-75%', wind: 'Đông Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng đẹp, biển Nha Trang trong xanh. Nhiệt độ 26-34°C'
      },
      'ninh thuận': {
        today: { temp: '27-35°C', condition: 'Nắng nóng, khô', humidity: '55-70%', wind: 'Đông Nam 15-20km/h' },
        tomorrow: { temp: '28-36°C', condition: 'Nắng nóng gay gắt', humidity: '50-65%', wind: 'Đông Nam 15-20km/h' },
        forecast: 'Tuần tới: Nắng nóng, khô hanh. Nhiệt độ 27-36°C'
      },
      'bình thuận': {
        today: { temp: '28-34°C', condition: 'Nắng nóng, có mây', humidity: '65-75%', wind: 'Đông Nam 15-20km/h' },
        tomorrow: { temp: '27-33°C', condition: 'Có mây, khả năng mưa rào nhẹ chiều tối', humidity: '70-80%', wind: 'Đông Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng ban ngày, mưa rào chiều tối. Nhiệt độ trung bình 28-33°C'
      },

      // Tây Nguyên
      'kon tum': {
        today: { temp: '22-32°C', condition: 'Nắng ấm', humidity: '60-75%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '23-33°C', condition: 'Nắng, có mây chiều tối', humidity: '55-70%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng ấm, mát mẻ về đêm. Nhiệt độ 22-33°C'
      },
      'gia lai': {
        today: { temp: '23-33°C', condition: 'Nắng ấm', humidity: '60-75%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '24-34°C', condition: 'Nắng nóng', humidity: '55-70%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng ban ngày, mát về đêm. Nhiệt độ 23-34°C'
      },
      'đắk lắk': {
        today: { temp: '23-33°C', condition: 'Nắng ấm', humidity: '60-75%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '24-34°C', condition: 'Nắng, có mây', humidity: '55-70%', wind: 'Tây Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm, thích hợp tham quan cà phê. Nhiệt độ 23-34°C'
      },
      'đắk nông': {
        today: { temp: '23-33°C', condition: 'Nắng ấm', humidity: '60-75%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '24-34°C', condition: 'Nắng', humidity: '55-70%', wind: 'Tây Nam 10km/h' },
        forecast: 'Tuần tới: Nắng ấm. Nhiệt độ 23-34°C'
      },
      'lâm đồng': {
        today: { temp: '18-28°C', condition: 'Mát mẻ, có nắng', humidity: '60-80%', wind: 'Đông 10km/h' },
        tomorrow: { temp: '19-29°C', condition: 'Nắng nhẹ, mát mẻ', humidity: '55-75%', wind: 'Đông Nam 10km/h' },
        forecast: 'Tuần tới: Mát mẻ quanh năm, thích hợp nghỉ dưỡng. Nhiệt độ 18-29°C'
      },

      // Đông Nam Bộ
      'hồ chí minh': {
        today: { temp: '26-33°C', condition: 'Nắng, chiều tối có mưa', humidity: '70-85%', wind: 'Nam 10-15km/h' },
        tomorrow: { temp: '26-32°C', condition: 'Có mây, mưa rào và dông', humidity: '75-90%', wind: 'Tây Nam 15-20km/h' },
        forecast: 'Tuần tới: Mưa dông chiều tối, nắng gián đoạn. Nhiệt độ 26-32°C'
      },
      'bình phước': {
        today: { temp: '25-34°C', condition: 'Nắng nóng', humidity: '65-80%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '26-35°C', condition: 'Nắng nóng, có mưa rào chiều', humidity: '60-75%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng ban ngày, mưa dông chiều. Nhiệt độ 25-35°C'
      },
      'tây ninh': {
        today: { temp: '26-34°C', condition: 'Nắng nóng', humidity: '65-80%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-35°C', condition: 'Nắng nóng, mưa rào chiều', humidity: '60-75%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng, mưa dông chiều tối. Nhiệt độ 26-35°C'
      },
      'bình dương': {
        today: { temp: '26-33°C', condition: 'Nắng, có mưa chiều', humidity: '70-85%', wind: 'Nam 10km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng nóng, mưa rào chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng, mưa dông chiều. Nhiệt độ 26-34°C'
      },
      'đồng nai': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Nam 10km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng, mưa dông chiều tối', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông chiều tối. Nhiệt độ 26-34°C'
      },
      'bà rịa - vũng tàu': {
        today: { temp: '26-32°C', condition: 'Nắng, có mây', humidity: '70-85%', wind: 'Đông Nam 15km/h' },
        tomorrow: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '65-80%', wind: 'Đông Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng đẹp, biển trong xanh. Nhiệt độ 26-33°C'
      },
      'long an': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa chiều', humidity: '70-85%', wind: 'Nam 10km/h' },
        tomorrow: { temp: '26-34°C', condition: 'Nắng nóng, mưa rào chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông chiều. Nhiệt độ 26-34°C'
      },

      // Đồng bằng sông Cửu Long
      'tiền giang': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa rào chiều tối. Nhiệt độ 26-34°C'
      },
      'bến tre': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10-15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông chiều. Nhiệt độ 26-34°C'
      },
      'trà vinh': {
        today: { temp: '26-33°C', condition: 'Nắng, có mây', humidity: '70-85%', wind: 'Tây Nam 10-15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa rào chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa rào chiều tối. Nhiệt độ 26-34°C'
      },
      'vĩnh long': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông chiều. Nhiệt độ 26-34°C'
      },
      'đồng tháp': {
        today: { temp: '26-34°C', condition: 'Nắng nóng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-35°C', condition: 'Nắng nóng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng, mưa dông chiều. Nhiệt độ 26-35°C'
      },
      'an giang': {
        today: { temp: '26-34°C', condition: 'Nắng nóng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-35°C', condition: 'Nắng nóng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng nóng, mưa dông chiều. Nhiệt độ 26-35°C'
      },
      'kiên giang': {
        today: { temp: '26-33°C', condition: 'Nắng, có mưa rào', humidity: '70-85%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông. Biển Phú Quốc đẹp. Nhiệt độ 26-34°C'
      },
      'cần thơ': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông chiều. Nhiệt độ 26-34°C'
      },
      'hậu giang': {
        today: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 10km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa dông chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa dông chiều. Nhiệt độ 26-34°C'
      },
      'sóc trăng': {
        today: { temp: '26-33°C', condition: 'Nắng, có mây', humidity: '70-85%', wind: 'Tây Nam 10-15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa rào chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa rào chiều. Nhiệt độ 26-34°C'
      },
      'bạc liêu': {
        today: { temp: '26-33°C', condition: 'Nắng, có mây', humidity: '70-85%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '27-34°C', condition: 'Nắng, mưa rào chiều', humidity: '65-80%', wind: 'Tây Nam 10-15km/h' },
        forecast: 'Tuần tới: Nắng, mưa rào chiều. Nhiệt độ 26-34°C'
      },
      'cà mau': {
        today: { temp: '26-32°C', condition: 'Nắng, có mây', humidity: '75-90%', wind: 'Tây Nam 15km/h' },
        tomorrow: { temp: '26-33°C', condition: 'Nắng, mưa rào chiều', humidity: '70-85%', wind: 'Tây Nam 15km/h' },
        forecast: 'Tuần tới: Nắng, mưa rào. Nhiệt độ 26-33°C'
      }
    }

    // Create context with sensor data if provided
    let systemMessage = `Bạn là Robot Hoa - robot đa chức năng thông minh. Khi được hỏi "bạn là ai", hãy giới thiệu: "Tôi là Robot Hoa, robot đa chức năng thông minh được thiết kế để giúp đỡ bạn."

Robot Hoa có các tính năng:
- Nhảy múa theo nhạc và ánh sáng
- Đo nhiệt độ, độ ẩm không khí
- Giám sát chất lượng không khí
- Lọc không khí và tạo độ ẩm
- Báo cháy và báo trộm
- Đo bụi mịn
- Loa Bluetooth
- Camera giám sát
- Dự báo thời tiết

QUAN TRỌNG: Khi người dùng hỏi về thời tiết, hãy sử dụng dữ liệu sau để trả lời:

DỮ LIỆU THỜI TIẾT HIỆN TẠI:
${JSON.stringify(weatherData, null, 2)}

Khi được hỏi về thời tiết một địa phương (như "thời tiết Bình Thuận", "dự báo thời tiết Bình Thuận ngày mai"), hãy:
1. Tìm tên địa phương trong dữ liệu thời tiết (không phân biệt chữ hoa/thường, bỏ qua dấu)
2. Trả lời chi tiết với nhiệt độ, tình trạng thời tiết, độ ẩm, hướng gió
3. Nếu hỏi "hôm nay" → dùng data.today
4. Nếu hỏi "ngày mai" → dùng data.tomorrow
5. Nếu hỏi "tuần sau" → dùng data.forecast

Ví dụ câu trả lời:
"Dự báo thời tiết Bình Thuận ngày mai: Nhiệt độ 27-33°C, có mây, khả năng mưa rào nhẹ vào chiều tối. Độ ẩm 70-80%, gió Đông Nam 10-15km/h. Tuần tới: Nắng nóng ban ngày, mưa rào chiều tối với nhiệt độ trung bình 28-33°C."

Hãy trả lời bằng tiếng Việt một cách thân thiện, chi tiết và hữu ích.`

    if (sensorData) {
      systemMessage += `\n\nDữ liệu cảm biến hiện tại:
${JSON.stringify(sensorData, null, 2)}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const reply = completion.choices[0].message.content

    res.status(200).json({ reply })
  } catch (error) {
    console.error('ChatGPT Error:', error)
    res.status(500).json({ 
      message: 'Error communicating with ChatGPT', 
      error: error.message 
    })
  }
}
