# 🚀 Quick Start Guide

## ⚡ Khởi động nhanh trong 3 bước

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy development server
```bash
npm run dev
```

### Bước 3: Mở trình duyệt
```
http://localhost:3000
```

**🎉 Xong! Dashboard đã sẵn sàng!**

---

## 🎮 Sử dụng Demo Mode

1. Tìm toggle **"Demo Mode"** ở góc trên phải header
2. Click để bật (màu xanh = ON)
3. Dữ liệu sẽ tự động thay đổi ngẫu nhiên
4. Xem các thông báo xuất hiện tự động

**💡 Tip**: Bật Demo Mode để test tất cả tính năng mà không cần database!

---

## 🔔 Kiểm tra Thông báo

1. Nhìn icon chuông (🔔) ở header
2. Nếu có badge đỏ = có thông báo mới
3. Click vào để xem danh sách
4. Thông báo đỏ = KHẨN CẤP (báo cháy/trộm)

---

## 🤖 Xem Robot Status

Widget màu tím ở giữa dashboard:
- **🤖 Đứng yên** = Robot chờ
- **🤖 Nhảy** = Robot đang hoạt động
- **🤖 Nhấp nháy đỏ** = Có cảnh báo

---

## 📊 Đọc Sensor Data

### Cards ở trên:
1. **🌡️ Nhiệt độ**: Xem nhiệt độ hiện tại (°C)
2. **💧 Độ ẩm**: Trạng thái máy tạo ẩm
3. **💡 Ánh sáng**: Cường độ sáng (lux)
4. **🌫️ Bụi mịn**: Chất lượng không khí (ppm)

### Cảnh báo tự động:
- Nhiệt độ > 35°C → Chữ đỏ + icon ⚠️
- Bụi mịn > 35 ppm → Border đỏ nhấp nháy

---

## 📈 Xem Biểu đồ

Scroll xuống để thấy 3 biểu đồ:
1. Nhiệt độ (đỏ)
2. Ánh sáng (vàng)
3. Bụi mịn (tím)

**Hover** vào điểm để xem giá trị chi tiết!

---

## 💬 Chat với AI

1. Tìm box chat bên phải
2. Nhập câu hỏi (VD: "Nhiệt độ bao nhiêu?")
3. Nhấn Enter hoặc nút "Gửi"
4. Đợi AI trả lời

---

## 🎯 Test các tính năng

### Test Báo cháy:
1. Bật Demo Mode
2. Đợi sensor "Báo cháy" chuyển ON
3. Xem:
   - Alert banner đỏ xuất hiện
   - Notification bell có badge
   - Robot widget nhấp nháy đỏ
   - Security card màu đỏ

### Test Robot nhảy:
1. Đợi "Nhảy theo nhạc" hoặc "Nhảy theo ánh sáng" = ON
2. Xem:
   - Robot icon nhảy (bounce)
   - Notification xanh
   - Widget grid có viền xanh

---

## 🔧 Troubleshooting nhanh

### Không thấy dữ liệu?
→ Bật **Demo Mode**

### Thông báo không hiện?
→ **Refresh** trang (F5)

### Chat không hoạt động?
→ Kiểm tra `.env.local` có `OPENAI_API_KEY`

---

## 📱 Test Responsive

1. **Desktop**: Thu nhỏ cửa sổ browser
2. **Mobile**: Bấm F12 → Device toolbar
3. **Tablet**: Chọn iPad trong device list

Layout tự động điều chỉnh!

---

## 🎨 Tùy chỉnh nhanh

### Thay đổi màu:
→ Edit `tailwind.config.js`

### Thêm sensor:
→ Edit `lib/mockData.js`

### Thay text thông báo:
→ Edit `getNotificationMessage()` trong `lib/mockData.js`

---

## 📚 Đọc thêm

- **README.md** - Tổng quan dự án
- **USAGE_GUIDE.md** - Hướng dẫn chi tiết
- **FEATURES.md** - Danh sách tính năng đầy đủ

---

## 🆘 Cần giúp?

1. Xem console log (F12)
2. Đọc error message
3. Check `.env.local` config
4. Restart server: Ctrl+C → `npm run dev`

---

## 🎊 Chúc mừng!

Bạn đã sẵn sàng sử dụng dashboard! 

**Next steps:**
- ✅ Test tất cả tính năng
- ✅ Tùy chỉnh theo ý muốn
- ✅ Kết nối database thật
- ✅ Deploy lên production

**Happy coding! 🚀**
