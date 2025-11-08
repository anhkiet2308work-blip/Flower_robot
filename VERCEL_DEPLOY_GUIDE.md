# 🚀 Hướng dẫn Deploy lên Vercel

## ⚠️ Lỗi thường gặp và cách fix

### 1. Lỗi "404 NOT_FOUND" hoặc không lấy được dữ liệu từ database

**Nguyên nhân**: Thiếu environment variables trên Vercel

**Giải pháp**: Cấu hình Environment Variables trên Vercel Dashboard

#### Các bước:

1. Vào **Vercel Dashboard** → Chọn project `smart-robot-2`
2. Vào **Settings** → **Environment Variables**
3. Thêm các biến sau:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
OPENAI_API_KEY=sk-your_openai_key_here
```

4. **Save** và **Redeploy** project

### 2. Lấy Supabase Keys

1. Vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Lấy OpenAI API Key

1. Vào [OpenAI Platform](https://platform.openai.com/api-keys)
2. Tạo API key mới
3. Copy key → `OPENAI_API_KEY`

## 📋 Checklist trước khi deploy

- [ ] Đã tạo file `.env.local` với đầy đủ keys
- [ ] Test local chạy OK (`npm run dev`)
- [ ] Đã push code lên GitHub
- [ ] Đã cấu hình Environment Variables trên Vercel
- [ ] Đã redeploy sau khi thêm env variables

## 🔗 Routes

- `/` → Auto redirect sang `/robot`
- `/robot` → Giao diện Robot Mode (khóa báo cháy/trộm)
- `/user` → Giao diện User Mode (full control + camera + chat)

## 🎤 Tính năng mới

### Thu âm giọng nói trong Chat
- Nhấn nút 🎤 để bắt đầu ghi âm
- Nói tiếng Việt
- Tự động chuyển thành văn bản
- Hỗ trợ trình duyệt: Chrome, Edge (Desktop)

## 🐛 Debug trên Vercel

1. Vào **Deployments** → Chọn deployment mới nhất
2. Click **View Function Logs** để xem logs
3. Tìm lỗi trong console logs
4. Thường gặp:
   - `Supabase URL is not set` → Thiếu env variable
   - `OPENAI_API_KEY` → Thiếu OpenAI key
   - `401 Unauthorized` → Sai key hoặc hết quota

## 📱 Test Production

Sau khi deploy thành công:
1. Mở `https://smart-robot-2.vercel.app/user`
2. Kiểm tra các ô cảm biến có hiển thị dữ liệu
3. Test bật/tắt chức năng → Check console logs
4. Test chat AI và thu âm giọng nói
