import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/Footer";
import Newsletter from "../components/Newsletter/Newsletter";
export const metadata = {
  title: "Courses",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
}