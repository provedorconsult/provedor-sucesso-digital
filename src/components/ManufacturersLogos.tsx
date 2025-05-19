
import { Button } from "@/components/ui/button";

const manufacturers = [
  { name: "Mikrotik", logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/MikroTik_logo.svg" },
  { name: "Huawei", logo: "/lovable-uploads/02eb0dc9-3675-47c4-85d5-392cf7b12bba.png" },
  { name: "Nokia", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg" },
  { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { name: "Intelbras", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Intelbras_Logo.svg" },
  { name: "Ubiquiti", logo: "/lovable-uploads/fdb66e83-a76c-49f7-94bd-249bf0413eb4.png" },
  { name: "FiberHome", logo: "/lovable-uploads/cd9ec6e2-2020-4485-93e1-204e83a2952a.png" },
  { name: "ZTE", logo: "/lovable-uploads/ec1ad039-a4d2-464f-8e41-5e7ebedcc439.png" },
  { name: "Multilaser", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Logo_Multilaser_-_PNG.png" },
  { name: "Juniper", logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Juniper_Networks_logo.svg" },
];

const ManufacturersLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-section">
        <h2 className="section-title text-center mx-auto mb-12">Trabalhamos com as Principais Marcas</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {manufacturers.map((manufacturer) => (
            <div 
              key={manufacturer.name} 
              className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              title={manufacturer.name}
            >
              <img 
                src={manufacturer.logo} 
                alt={`${manufacturer.name} logo`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
            className="btn-primary"
          >
            Entre em Contato para Suporte Especializado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ManufacturersLogos;
