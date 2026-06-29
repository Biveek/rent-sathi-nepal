import Navbar from "@/components/Navbar";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body >
      <Navbar />
        {children}</body>
    </html>
  );
};
 
export default RootLayout;