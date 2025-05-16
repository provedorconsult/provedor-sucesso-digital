
import { Check } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      title: "Expertise Completo",
      description: "Beneficie-se do nosso profundo conhecimento em diversas tecnologias de rede, incluindo Mikrotik, Cisco, Huawei e mais."
    },
    {
      title: "Suporte Proativo",
      description: "Garanta a estabilidade da rede com nosso monitoramento ativo 24/7 e equipe especializada."
    },
    {
      title: "Soluções Econômicas",
      description: "Acesse suporte e serviços de alta qualidade a preços competitivos, incluindo planos personalizados."
    },
    {
      title: "Foco no Crescimento",
      description: "Explore novas fontes de receita com nossos serviços de valor agregado, como energia solar e segurança."
    }
  ];

  return (
    <section id="sobre" className="bg-brand-gray py-16">
      <div className="container-section">
        <h2 className="section-title text-center mx-auto">Por Que Escolher o Canal do Provedor?</h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Somos especialistas no setor de provedores de internet, oferecendo soluções completas que garantem a estabilidade, eficiência e crescimento do seu negócio.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-darkblue mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
