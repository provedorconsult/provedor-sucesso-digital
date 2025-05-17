
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center bg-gradient-to-r from-gray-900 to-brand-darkblue pt-16"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Seu Parceiro de Confiança para o Sucesso do seu ISP
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Impulsione seu provedor de internet com suporte especializado e soluções inovadoras que garantem estabilidade e crescimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
              className="btn-primary"
              size="lg"
            >
              Solicite uma Consultoria
            </Button>
            <Button 
              onClick={() => document.getElementById('servicos')?.scrollIntoView({behavior: 'smooth'})}
              variant="outline" 
              className="bg-white text-brand-darkblue border-2 border-white hover:bg-white/90 hover:text-brand-blue transition-colors font-medium"
              size="lg"
            >
              Conheça Nossos Serviços
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,128C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
