
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/556196188786', '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-brand-darkblue">
            Canal do Provedor
          </h1>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#inicio" className="text-gray-700 hover:text-brand-blue font-medium">Início</a></li>
            <li><a href="#sobre" className="text-gray-700 hover:text-brand-blue font-medium">Por Que Nós</a></li>
            <li><a href="#servicos" className="text-gray-700 hover:text-brand-blue font-medium">Serviços</a></li>
            <li><a href="#contato" className="text-gray-700 hover:text-brand-blue font-medium">Contato</a></li>
          </ul>
        </nav>
        
        <div className="hidden md:block">
          <Button 
            className="btn-primary"
            onClick={handleWhatsAppRedirect}
          >
            Fale Conosco
          </Button>
        </div>
        
        <div className="block md:hidden">
          <button className="text-gray-700 hover:text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
