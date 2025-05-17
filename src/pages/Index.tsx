
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import ManufacturersLogos from "@/components/ManufacturersLogos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Canal do Provedor - Soluções para ISPs";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <ManufacturersLogos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
