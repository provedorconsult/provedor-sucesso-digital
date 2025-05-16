
import { Button } from "@/components/ui/button";

const ServiceCard = ({ 
  title, 
  description, 
  price = null,
  icon 
}: { 
  title: string; 
  description: string; 
  price?: string | null;
  icon: React.ReactNode;
}) => {
  return (
    <div className="service-card">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-brand-darkblue mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      {price && <p className="font-semibold text-brand-teal mb-4">{price}</p>}
      <Button 
        onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
        className="w-full" 
        variant="outline"
      >
        Saiba Mais
      </Button>
    </div>
  );
};

const Services = () => {
  return (
    <section id="servicos" className="py-16">
      <div className="container-section">
        <h2 className="section-title text-center mx-auto">Nossos Serviços</h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Soluções completas para ajudar seu provedor a se destacar no mercado e oferecer o melhor serviço aos seus clientes.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <ServiceCard 
            title="Consultoria Especializada" 
            description="5 horas mensais de consultoria, incluindo planejamento de infraestrutura e backbone, orientação remota, design de topologia de rede e suporte para diversos sistemas de rede." 
            price="1 salário mínimo"
            icon={
              <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="Monitoramento Ativo 24h" 
            description="Monitoramento 24/7 com Zabbix Cloud e alertas via Telegram. Equipe de monitoramento 24/7 e suporte a incidentes sob demanda a R$30,00 por equipamento (2 gratuitos)."
            icon={
              <div className="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="Projeto Solar para Provedores" 
            description="Oportunidade para ISPs gerarem receita revendendo energia solar ou implementando sua própria geração, com faturamento direto aos clientes."
            icon={
              <div className="w-14 h-14 rounded-lg bg-yellow-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="SVA Segurança Eletrônica" 
            description="Serviço de câmeras de segurança em comodato, monitoramento 24/7 com equipe e IA, e gravação de imagens em nuvem."
            icon={
              <div className="w-14 h-14 rounded-lg bg-red-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="SVA Empréstimo Bancário" 
            description="Oportunidade de franquia de representação financeira, destacando o sistema integrado com os principais bancos e a estrutura de bônus."
            icon={
              <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
          />
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
            className="btn-primary"
            size="lg"
          >
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
