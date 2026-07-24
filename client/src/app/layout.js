import Navbar from "@/components/layout/navbar/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
