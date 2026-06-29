import Navbar from "@/components/Navbar";
import Providers from "./providers";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
};
 
export default RootLayout;