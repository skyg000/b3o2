import Header from "./comp/Header";
import Footer from "./comp/Footer";
import "./globals.css";
import Context from "./Context";

export const metadata = {
  title: "별별 연인",
  description: "사주를 통한 나의 짝 찾기",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Context>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </Context>
      </body>
    </html>
  );
}
