# ReactJS Code Base với Quản lý State bằng MobX

## Giới thiệu

Dự án này là một code base cơ bản cho ứng dụng ReactJS sử dụng `MobX` để quản lý state. Hiện tại, ứng dụng bao gồm một màn hình login cơ bản với khả năng gửi dữ liệu đăng nhập lên hệ thống. Bộ code được thiết kế để dễ dàng mở rộng và tuân theo các nguyên tắc tổ chức tốt nhất.

## Cấu trúc thư mục

```plaintext
src/
├── common/            # Chứa các tiện ích, cấu hình chung
├── pages/             # Chứa các trang giao diện chính
│   └── login/         # Thư mục chứa logic và giao diện màn hình Login
│       ├── LoginPage.tsx     # Giao diện và logic chính của Login
│       ├── LoginStore.ts     # Quản lý state của Login bằng MobX
│       ├── LoginService.ts   # Dịch vụ API xử lý logic liên quan đến Login
│       ├── Login.scss        # File SCSS tạo giao diện cho LoginPage
├── routing/           # Định nghĩa các route của ứng dụng
│   └── AppRouter.tsx  # Cấu hình routing
├── index.tsx          # Entry point của ứng dụng

```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


