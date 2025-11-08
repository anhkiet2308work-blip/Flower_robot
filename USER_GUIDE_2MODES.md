# Smart Robot Dashboard - Hướng dẫn sử dụng

## 🚀 Cách truy cập

### 🤖 Robot Mode
- URL: `http://localhost:3000/robot`
- Dành cho: Màn hình trên robot
- Tính năng:
  - ❌ KHÔNG thể tắt báo cháy/trộm (khóa cứng)
  - ✅ Có thể tắt xông tinh dầu, nhảy nhạc, nhảy ánh sáng
  - 🔔 Popup cảnh báo CHỈ cho cháy/trộm (không thể tắt)

### 👤 User Mode
- URL: `http://localhost:3000/user`
- Dành cho: Người dùng điều khiển
- Tính năng:
  - ✅ Có thể tắt TẤT CẢ cảnh báo
  - 📹 Có camera stream
  - 💬 Có chat AI
  - 🔔 Popup cảnh báo CHỈ cho cháy/trộm (có thể tắt)

## 📊 Các chức năng

### 1. Cảm biến (hiển thị giá trị)
- 🌡️ Nhiệt độ (°C)
- 💧 Độ ẩm (%)
- 💡 Ánh sáng (lux)
- 🌫️ Bụi mịn (ppm)

### 2. Trạng thái Robot (ON/OFF - có nút điều khiển)
- 🔥 **Báo cháy** - Popup cảnh báo (Robot: không tắt được, User: tắt được)
- 🚨 **Báo trộm** - Popup cảnh báo (Robot: không tắt được, User: tắt được)
- 🌿 **Xông tinh dầu** - KHÔNG popup, chỉ hiển thị status
- 🎵 **Nhảy theo nhạc** - KHÔNG popup, chỉ hiển thị status
- 💡 **Nhảy theo ánh sáng** - KHÔNG popup, chỉ hiển thị status

## 🔄 Cập nhật database

### Khi tắt cảnh báo:
1. User nhấn nút **"Tắt"** trên status box
2. Hoặc nhấn **"Đóng cảnh báo"** trên popup (chỉ User mode)
3. → API gọi: `POST /api/sensors/update` với `{ sensor: 'fire_alarm', value: 'OFF' }`
4. → **UPDATE** dòng duy nhất trong bảng (KHÔNG insert dòng mới)
5. → Database cập nhật giá trị ON/OFF

### Khi bật lại:
1. User nhấn nút **"Bật"** (màu xanh) trên status box (chỉ User mode)
2. → API gọi: `POST /api/sensors/update` với `{ sensor: 'fire_alarm', value: 'ON' }`
3. → **UPDATE** dòng duy nhất trong bảng
4. → Database cập nhật giá trị ON/OFF
5. → Sau 5s, popup hiện lại (nếu là fire/thieves)

## ⚠️ Lưu ý quan trọng

### Database Structure:
- Mỗi bảng CHỈ có **DUY NHẤT 1 dòng**
- API chỉ **UPDATE** dòng đó, KHÔNG bao giờ insert dòng mới
- Format: `{ value: 'ON' hoặc 'OFF', ts: timestamp }`

### Popup Rules:
- ✅ **Có popup**: Fire alarm, Thieves alarm
- ❌ **KHÔNG popup**: Xông tinh dầu, Nhảy nhạc, Nhảy ánh sáng
- Robot Mode: Fire/Thieves popup KHÔNG thể tắt (locked 🔒)
- User Mode: Tất cả popup đều có thể tắt

### Button States:
- Status = ON + canDismiss = true → Hiện nút **"Tắt"** (trắng)
- Status = OFF + canDismiss = true → Hiện nút **"Bật"** (xanh)
- Status = ON + canDismiss = false → Hiện **"🔒 Khóa"**

## 🧪 Test

1. Mở browser: `http://localhost:3000/user`
2. Nhấn "Bật" trên một status box → Check console log: `✅ Turned ON ...`
3. Sau 5s → Nếu là fire/thieves: popup xuất hiện
4. Nhấn "Tắt" → Check console: `✅ Turned OFF ...`
5. Kiểm tra database → Value đã đổi từ ON → OFF

## 📡 API Endpoints

### GET `/api/sensors/latest`
- Lấy dữ liệu sensor mới nhất
- Tự động gọi mỗi 5 giây

### POST `/api/sensors/update`
- Body: `{ sensor: 'fire_alarm', value: 'ON' }`
- Response: `{ success: true, message: '...', data: {...} }`
- Chỉ UPDATE dòng duy nhất, không insert
