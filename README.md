
# 📦 Website Thương mại điện tử  VVD Shop – Tài liệu kỹ thuật Frontend

## 1. 📖 Giới thiệu tổng quan

Đây là dự án **frontend cho hệ thống thương mại điện tử** được xây dựng bằng **React** với kiến trúc module hóa, hỗ trợ quản trị viên, chủ shop và người dùng cuối. Ứng dụng hướng tới trải nghiệm người dùng mượt mà, hỗ trợ nhiều tính năng hiện đại như **giỏ hàng chia theo shop, thanh toán MoMo, đăng nhập bằng Google/Facebook**, và có hệ thống quản trị riêng cho từng shop.

---

## 2. 🧰 Công nghệ sử dụng

| Công nghệ                             | Mục đích                                    |
| ------------------------------------- | ------------------------------------------- |
| **React 18 + React Router v6**        | Xây dựng giao diện và định tuyến            |
| **Redux Toolkit**                     | Quản lý state toàn cục                      |
| **React Query**                       | Quản lý dữ liệu bất đồng bộ, cache hiệu quả |
| **Formik + Yup**                      | Quản lý form và validation                  |
| **MUI (Material UI)**                 | Giao diện UI hiện đại                       |
| **Tailwind CSS**                      | Tùy biến giao diện nhanh chóng              |
| **Firebase**                          | Đăng nhập Google, Facebook                  |
| **Axios**                             | Giao tiếp với API backend                   |
| **MoMo SDK**                          | Tích hợp thanh toán điện tử                 |
| **SweetAlert2 / Toastify / Skeleton** | UX nâng cao: thông báo, loading...          |

---

## 3. 🗂️ Cấu trúc thư mục chính

```plaintext
.
├── public/
│   ├── font/            # Fonts tùy chỉnh
│   └── svg/             # Biểu tượng vector dùng chung

└── src/
    ├── admin/           # Mô-đun dành riêng cho quản trị viên
    │   ├── components/  # Các component trong dashboard
    │   ├── data/        # Dữ liệu mẫu / tĩnh
    │   ├── pages/       # Trang quản trị: dashboard, quản lý người dùng,...
    │   └── service/     # API / service riêng cho admin

    ├── api/             # Cấu hình và định nghĩa các API endpoint
    ├── assets/
    │   └── image/       # Hình ảnh tĩnh sử dụng trong UI
    ├── components/      # Component dùng chung frontend
    │   ├── address/
    │   ├── baskets/
    │   ├── chats/       # Tính năng trò chuyện
    │   ├── common/      # Component UI nhỏ
    │   ├── field/       # Input, Form fields
    │   ├── header/      # Navbar, header
    │   ├── products/    # Hiển thị sản phẩm
    │   ├── skeleton/    # Component loading
    │   └── views/       # Layout hiển thị tổng quát

    ├── constants/       # Các hằng số dùng trong ứng dụng
    ├── helpers/         # Hàm xử lý logic phụ trợ
    ├── hooks/           # Custom React hooks
    ├── language/        # Cấu hình đa ngôn ngữ i18n
    ├── layouts/         # Layout trang: Default, Admin,...
    ├── pages/           # Các trang người dùng
    │   ├── cart/
    │   ├── checkout/
    │   ├── login/
    │   ├── orderDetail/
    │   ├── productDetail/
    │   ├── shop/
    │   └── ...          # Các trang khác như post, user, verify,...
    ├── redux/
    │   └── slice/       # Redux slices (store)
    ├── router/          # Cấu hình định tuyến React Router
    ├── seller/          # Module riêng cho shop
    │   ├── components/
    │   ├── data/
    │   ├── layouts/
    │   ├── pages/
    │   └── service/
    ├── service/         # Dịch vụ API dùng chung
    ├── styles/          # CSS/SCSS global
    └── utils/           # Tiện ích, xử lý định dạng số, thời gian...
```

---

## 4. ⚙️ Các chức năng chính

### 🧑‍💼 Quản trị viên (admin)

* Quản lý:
  * Sản phẩm, danh mục, thương hiệu
  * Người dùng, shop bán hàng
  * Slider, đơn hàng, nhập hàng
  * Biến thể sản phẩm, hàng tồn kho
  * Báo cáo doanh thu theo thời gian
* Phân quyền và giám sát toàn bộ hệ thống


### 🏬 Shop bán hàng

* Trang quản trị riêng cho từng shop
* Tạo và quản lý sản phẩm của mình
* Theo dõi đơn hàng, doanh thu
* Quản lý tồn kho, hình ảnh, mô tả sản phẩm
* Xử lý đơn nhập hàng
* Hệ thống chat real-time giữa người dùng và shop
* Quản lý khuyến mãi / mã giảm giá
* Dashboard analytics

### 👤 Người dùng cuối

* Đăng ký/đăng nhập thường hoặc bằng **Facebook, Google**
* Quản lý:

  * Tài khoản cá nhân, đổi mật khẩu, quên mật khẩu
  * Đơn hàng, trạng thái đơn hàng
* Giỏ hàng:

  * **Chia theo shop**
  * Chỉnh sửa, xoá, chọn nhanh
* Danh sách **sản phẩm yêu thích**
* **Thanh toán điện tử** bằng MoMo
* Gửi email xác thực, khôi phục mật khẩu
* Xem chi tiết sản phẩm, lọc sản phẩm theo danh mục, thương hiệu
* Theo dõi đơn hàng theo thời gian thực với gửi mail
* Đánh giá sản phẩm (reviews)
* Lịch sử tìm kiếm, gợi ý sản phẩm tương tự

---

## 5. 🛠️ Hướng dẫn vận hành dự án

### ✅ Cài đặt

```bash
npm install
```

### 🚀 Chạy dự án

```bash
npm run dev
```

### 🏗️ Build cho production

```bash
npm run build
```

### 🔍 Kiểm tra lint

```bash
npm run lint
```
---

Dưới đây là phần bổ sung mục **Thông tin liên hệ** vào cuối tài liệu kỹ thuật của bạn:

---

## 6. 📬 Thông tin liên hệ

Mọi thắc mắc, góp ý hoặc yêu cầu hỗ trợ kỹ thuật về dự án xin vui lòng liên hệ:

* 👤 **Tên:** Vũ Văn Định
* 📧 **Email:** [vuvandinh.work@gmail.com](mailto:vuvandinh.work@gmail.com)
* 📱 **Số điện thoại (Zalo):** 0333583800
* 🌐 **GitHub:** [https://github.com/vuvandinh123](https://github.com/vuvandinh123)
* 💼 **Website:** [https://vuvandinh.id.vn](https://vuvandinh.id.vn)

