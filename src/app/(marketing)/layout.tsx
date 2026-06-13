
import Footer from "@/components/web/Footer";
import Navbar from "@/components/web/navbar";
import { ReactNode } from "react";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
     <main className="mt-24">
        {children}
     </main>
     <Footer/>
    </>
  );
}