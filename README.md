# Sensor Robot Dashboard 🤖

Dashboard web hiển thị dữ liệu và điều khiển robot đa chức năng thông minh với hệ thống thông báo real-time và giao diện tương tác cao.

## ✨ Tính năng chính

### 📊 Giám sát Real-time
- 🌡️ Nhiệt độ, độ ẩm, ánh sáng, bụi mịn
- � Biểu đồ lịch sử với Recharts
- 🔄 Auto-refresh mỗi 5 giây
- ⚠️ Cảnh báo tự động khi vượt ngưỡng

### 🔔 Hệ thống thông báo thông minh
- 💬 Notification Center với badge số lượng
- 🚨 Alert banner toàn màn hình cho sự kiện khẩn cấp
- 🎨 Phân loại theo mức độ: Critical, Warning, Info
- ⏰ Timestamp cho mỗi thông báo

### 🎭 Hiệu ứng Visual
- 🔥 Animation đặc biệt khi báo cháy/trộm được kích hoạt
- 💃 Robot icon nhảy khi chế độ dance được bật
- ⚡ Pulse effect cho các sensor đang active
- 🌈 Màu sắc thay đổi theo trạng thái

### 🤖 Robot Status Widget
- 📍 Hiển thị trạng thái tổng quan của robot
- 🎵 Chế độ nhảy theo nhạc
- 💡 Chế độ nhảy theo ánh sáng
- 🔥 Cảnh báo an ninh (cháy, trộm)

### 💬 AI Chat Integration
- 🤖 Trò chuyện với ChatGPT
- 🌤️ Dự báo thời tiết
- 📱 Giao diện responsive, hoạt động tốt trên mọi thiết bị

### 🎮 Demo Mode
- 🎲 Toggle để chuyển giữa dữ liệu thật và demo
- 📊 Mock data generator tự động
- 🔄 Dữ liệu ngẫu nhiên cho testing

## Công nghệ sử dụng

- **Frontend**: React with Next.js
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **AI**: OpenAI ChatGPT API

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình file `.env.local` với API keys của bạn:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

3. Chạy development server:
```bash
npm run dev
```

4. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## Cấu trúc Database

Database bao gồm các bảng:
- `temperature_sensor` - Dữ liệu nhiệt độ
- `humidity_sensor` - Dữ liệu độ ẩm
- `light_sensor` - Dữ liệu ánh sáng
- `dust_sensor` - Dữ liệu bụi mịn
- `fire_alarm` - Trạng thái báo cháy
- `thieves_alarm` - Trạng thái báo trộm
- `sound_dance_sensor` - Nhảy theo nhạc
- `light_dance_sensor` - Nhảy theo ánh sáng

## Build cho Production

```bash
npm run build
npm start
```

## 🎯 Tính năng của Robot

✅ Nhảy múa theo nhạc và ánh sáng
✅ Đo nhiệt độ, độ ẩm không khí
✅ Giám sát chất lượng không khí (PPM)
✅ Đo bụi mịn (PM2.5)
✅ Lọc không khí và tạo độ ẩm
✅ Báo cháy và báo trộm
✅ Loa Bluetooth
✅ Camera giám sát
✅ Tích hợp ChatGPT để giao tiếp
✅ Giao tiếp giọng nói
✅ Dự báo thời tiết
✅ Ứng dụng điều khiển từ xa

## 📸 Screenshots

### Dashboard Overview
- Hiển thị tất cả sensor data trong các card đẹp mắt
- Real-time charts với animation mượt mà
- Robot status widget với icon động

### Notification System
- Bell icon với badge số lượng thông báo chưa đọc
- Dropdown hiển thị danh sách thông báo chi tiết
- Alert banner cho sự kiện khẩn cấp

### Alert States
- 🔥 Báo cháy: Background đỏ, animate pulse, sound alert
- 🚨 Báo trộm: Border đỏ nhấp nháy, critical notification
- 💃 Robot dancing: Icon nhảy, màu xanh lá
- ⚠️ High values: Cảnh báo màu đỏ trên sensor cards

## 🔧 Tùy chỉnh

### Thêm sensor mới
1. Thêm mock data vào `lib/mockData.js`
2. Thêm API endpoint trong `pages/api/`
3. Tạo component mới trong `components/`
4. Cập nhật dashboard `pages/index.js`

### Tùy chỉnh thông báo
Chỉnh sửa `getNotificationMessage()` trong `lib/mockData.js` để thay đổi nội dung thông báo.

### Thay đổi ngưỡng cảnh báo
Chỉnh sửa logic trong `SensorCard.js` prop `warning` và threshold values.

## 🚀 Future Enhancements

- [ ] Voice control integration
- [ ] Real-time video stream từ camera
- [ ] Export dữ liệu ra CSV/PDF
- [ ] Mobile app với React Native
- [ ] Push notifications qua Firebase
- [ ] User authentication và roles
- [ ] Historical data comparison
- [ ] Custom dashboard layouts
- [ ] API để điều khiển robot

## 📝 License

MIT

## 👨‍💻 Tác giả

Dashboard được phát triển cho Robot thông minh đa chức năng - HK5 KHKT Project 2025
