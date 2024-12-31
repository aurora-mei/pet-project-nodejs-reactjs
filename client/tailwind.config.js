/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Đường dẫn đến file HTML chính
    "./src/**/*.{js,ts,jsx,tsx}", // Bao gồm tất cả các file React và TypeScript
  ],
  theme: {
    extend: {}, // Thêm tùy chỉnh nếu cần
  },
  plugins: [], // Thêm plugin nếu cần
};
