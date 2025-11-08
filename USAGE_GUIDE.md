# 📘 Hướng dẫn sử dụng Dashboard Robot

## 🎯 Tổng quan giao diện

### 1. Header (Thanh trên cùng)
- **Logo & Tiêu đề**: "🤖 Dashboard Robot Thông Minh"
- **Demo Mode Toggle**: Bật/tắt chế độ demo
  - ON (xanh): Sử dụng dữ liệu giả để test
  - OFF (xám): Kết nối database thật
- **Notification Bell (🔔)**: Icon thông báo
  - Badge màu đỏ: Số thông báo chưa đọc
  - Nhấp vào để xem danh sách thông báo
- **Last Update**: Thời gian cập nhật gần nhất

---

## 🔔 Hệ thống thông báo

### Notification Center
**Cách sử dụng:**
1. Nhấp vào icon chuông (🔔) ở góc trên phải
2. Xem danh sách thông báo theo thời gian
3. Nhấn "Xóa tất cả" để xóa thông báo

**Màu sắc thông báo:**
- 🔴 **Đỏ (Critical)**: Báo cháy, báo trộm - CẦN XỬ LÝ NGAY!
- 🟡 **Vàng (Warning)**: Cảnh báo
- 🔵 **Xanh (Info)**: Thông tin thường
- ⚪ **Xám (Normal)**: Trạng thái bình thường

### Alert Banner (Banner cảnh báo)
- Xuất hiện ở **giữa màn hình** khi có sự kiện KHẨN CẤP
- Tự động đóng sau 10 giây (trừ critical alerts)
- Nhấn nút X để đóng thủ công

**Các loại cảnh báo:**
- 🔥 **Báo cháy**: Background đỏ, nhấp nháy - "Môi trường xung quanh đang cháy!"
- 🚨 **Báo trộm**: Background đỏ, nhấp nháy - "Có người lạ đang xâm nhập!"
- 🎵 **Nhảy theo nhạc**: Background xanh - "Robot đang nhảy múa theo nhạc!"
- 💡 **Nhảy theo ánh sáng**: Background xanh - "Robot đang nhảy múa theo ánh sáng!"

---

## 🤖 Robot Status Widget

Widget màu tím hiển thị trạng thái tổng quan của robot:

### Biểu tượng Robot 🤖
- **Đứng yên**: Robot ở chế độ chờ
- **Nhảy (bounce)**: Robot đang hoạt động (nhảy múa)
- **Nhấp nháy đỏ**: Robot phát hiện nguy hiểm

### 4 Chức năng chính
1. **🎵 Nhạc**: Nhảy theo âm thanh
2. **💡 Ánh sáng**: Nhảy theo ánh sáng
3. **🔥 Cháy**: Cảnh báo cháy
4. **🚨 Trộm**: Cảnh báo trộm

**Màu sắc:**
- Xanh lá (có viền): Chức năng ĐANG BẬT
- Trong suốt: Chức năng TẮT

---

## 📊 Sensor Cards (Thẻ cảm biến)

### 4 loại cảm biến chính:

#### 1. 🌡️ Nhiệt độ
- Đơn vị: °C (độ C)
- Cảnh báo: > 35°C (màu đỏ, nhấp nháy)
- Animation: Phóng to khi giá trị thay đổi

#### 2. 💧 Độ ẩm
- Đơn vị: % hoặc ON/OFF
- Hiển thị trạng thái máy tạo độ ẩm

#### 3. 💡 Ánh sáng
- Đơn vị: lux (cường độ sáng)
- Màu vàng

#### 4. 🌫️ Bụi mịn
- Đơn vị: ppm (parts per million)
- Cảnh báo: > 35 ppm (màu đỏ)
- Animation: Border đỏ nhấp nháy

**Hiệu ứng khi cập nhật:**
- Scale lên 105%
- Ring màu xanh
- Icon xoay nhẹ

---

## 🛡️ Hệ thống An ninh

### Card "🔥 Hệ thống an ninh"
Hiển thị 2 cảm biến:
- **Báo cháy**: ON = Phát hiện cháy
- **Báo trộm**: ON = Phát hiện xâm nhập

**Khi có cảnh báo:**
- Background đỏ nhạt
- Border đỏ đậm
- Animate pulse (nhấp nháy)
- Chấm đỏ nhấp nháy ở góc trên

---

## 📈 Biểu đồ (Charts)

### 3 biểu đồ chính:
1. **📈 Biểu đồ nhiệt độ** (màu đỏ)
2. **📈 Biểu đồ ánh sáng** (màu vàng)
3. **📈 Biểu đồ bụi mịn** (màu tím)

**Tính năng:**
- Hiển thị 20 điểm dữ liệu gần nhất
- Trục X: Thời gian (HH:mm)
- Trục Y: Giá trị cảm biến
- Hover để xem chi tiết

---

## 💬 Chat với Robot AI

### Cách sử dụng:
1. Nhập câu hỏi vào ô chat
2. Nhấn "Gửi" hoặc Enter
3. Đợi robot trả lời (có animation 3 chấm)

**Câu hỏi mẫu:**
- "Nhiệt độ hiện tại là bao nhiêu?"
- "Có nguy hiểm không?"
- "Thời tiết hôm nay thế nào?"
- "Robot đang làm gì?"

**Tính năng AI:**
- Tích hợp ChatGPT
- Hiểu context về dữ liệu sensor
- Trả lời bằng tiếng Việt

---

## 🌤️ Thông tin thời tiết

Card "🌤️ Thời tiết" hiển thị:
- Tên thành phố
- Nhiệt độ ngoài trời
- Độ ẩm
- Mô tả thời tiết

---

## ⚙️ Chế độ Demo Mode

### Khi BẬT (Toggle màu xanh):
- ✅ Dữ liệu tự động thay đổi ngẫu nhiên
- ✅ Test các tính năng không cần database
- ✅ Thấy được các trạng thái khác nhau
- ✅ Thông báo xuất hiện ngẫu nhiên

### Khi TẮT (Toggle màu xám):
- 📡 Kết nối database Supabase thật
- 📡 Hiển thị dữ liệu từ robot thật
- 📡 Cần cấu hình .env.local đúng

---

## 🎨 Ý nghĩa màu sắc

| Màu | Ý nghĩa | Sử dụng |
|-----|---------|---------|
| 🔴 Đỏ | Nguy hiểm, Critical | Báo cháy, báo trộm, cảnh báo cao |
| 🟠 Cam | Cảnh báo | Bụi mịn, ô nhiễm |
| 🟡 Vàng | Thông tin quan trọng | Ánh sáng, nhiệt độ cao |
| 🔵 Xanh dương | Bình thường, thông tin | Độ ẩm, thời tiết |
| 🟢 Xanh lá | An toàn, hoạt động | Trạng thái ON, đang chạy |
| 🟣 Tím | Giải trí | Robot dancing |

---

## 🔄 Auto Refresh

Dashboard tự động làm mới mỗi **5 giây** để:
- Cập nhật dữ liệu sensor
- Kiểm tra trạng thái mới
- Tạo thông báo nếu có thay đổi

---

## 🎯 Tips & Tricks

### 1. Kiểm tra nhanh trạng thái
- Nhìn Robot Status Widget
- Màu xanh = An toàn
- Màu đỏ nhấp nháy = Có vấn đề

### 2. Xem lịch sử
- Scroll xuống biểu đồ
- Hover vào điểm để xem chi tiết

### 3. Quản lý thông báo
- Kiểm tra notification bell thường xuyên
- Badge màu đỏ = Có thông báo mới
- Badge màu cam = Có thông báo thường

### 4. Chat với AI
- Hỏi về dữ liệu sensor
- Yêu cầu phân tích
- Hỏi về thời tiết

---

## ⚠️ Xử lý sự cố

### Không thấy dữ liệu?
1. Bật Demo Mode để test
2. Kiểm tra .env.local
3. Kiểm tra console log (F12)

### Thông báo không xuất hiện?
1. Kiểm tra sensor có giá trị ON không
2. Refresh trang (F5)
3. Clear cache

### Chat AI không hoạt động?
1. Kiểm tra OPENAI_API_KEY
2. Kiểm tra kết nối internet
3. Xem console log

---

## 📱 Responsive Design

Dashboard hoạt động tốt trên:
- 💻 Desktop (1920x1080+)
- 💻 Laptop (1366x768+)
- 📱 Tablet (768px+)
- 📱 Mobile (375px+)

Layout tự động điều chỉnh theo kích thước màn hình.

---

## 🆘 Liên hệ hỗ trợ

Nếu gặp vấn đề, liên hệ:
- GitHub Issues
- Email support
- Documentation

---

**🎉 Chúc bạn sử dụng dashboard hiệu quả!**
