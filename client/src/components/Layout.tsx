import { ReactNode } from "react";
import Navbar from "./HomePage/Navbar.tsx";
import { Footer } from "./HomePage/Footer.tsx";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
