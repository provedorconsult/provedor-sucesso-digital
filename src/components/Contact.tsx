
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Check, RefreshCw } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [antiBot, setAntiBot] = useState({
    number1: Math.floor(Math.random() * 10) + 1,
    number2: Math.floor(Math.random() * 10) + 1,
    answer: '',
    verified: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAntiBotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAntiBot(prev => ({ ...prev, answer: e.target.value }));
  };

  const verifyAntiBot = (e: React.MouseEvent) => {
    e.preventDefault();
    const correctAnswer = antiBot.number1 + antiBot.number2;
    
    if (parseInt(antiBot.answer) === correctAnswer) {
      setAntiBot(prev => ({ ...prev, verified: true }));
      toast({
        title: "Verificação bem-sucedida!",
        description: "Você pode enviar seu formulário agora.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Verificação falhou",
        description: "Por favor, tente novamente com a resposta correta.",
        variant: "destructive",
        duration: 3000,
      });
      regenerateCaptcha();
    }
  };

  const regenerateCaptcha = () => {
    setAntiBot({
      number1: Math.floor(Math.random() * 10) + 1,
      number2: Math.floor(Math.random() * 10) + 1,
      answer: '',
      verified: false
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!antiBot.verified) {
      toast({
        title: "Verificação necessária",
        description: "Por favor, complete a verificação anti-bot primeiro.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);
      
      if (error) throw error;
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      
      // Reset antiBot
      setAntiBot({
        number1: Math.floor(Math.random() * 10) + 1,
        number2: Math.floor(Math.random() * 10) + 1,
        answer: '',
        verified: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="bg-brand-gray py-16">
      <div className="container-section">
        <h2 className="section-title text-center mx-auto">Entre em Contato</h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Estamos prontos para ajudar seu provedor a crescer. Preencha o formulário abaixo e nossa equipe entrará em contato com você em breve.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-darkblue mb-6">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Empresa</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Anti-Bot Verification */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Verificação Anti-Bot</h4>
                
                {antiBot.verified ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span>Verificação concluída</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Para confirmar que você não é um robô, por favor resolva esta soma simples:
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{antiBot.number1} + {antiBot.number2} = </span>
                      <Input 
                        type="number" 
                        value={antiBot.answer}
                        onChange={handleAntiBotChange}
                        className="w-20"
                        placeholder="?"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={verifyAntiBot}
                      >
                        Verificar
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={regenerateCaptcha}
                        title="Gerar novo CAPTCHA"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isSubmitting || !antiBot.verified}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                {!isSubmitting && <ArrowRight className="ml-1 h-4 w-4" />}
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-brand-darkblue mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Endereço</h4>
                    <p className="text-gray-700">BR 070 KM 18 GLEBA 4 LOTE 494</p>
                    <p className="text-gray-700">CEP: 72227-993</p>
                    <p className="text-gray-700">Bairro: Ceilândia Norte</p>
                    <p className="text-gray-700">Brasília – DF</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Telefone</h4>
                    <p className="text-gray-700">(61) 9 9618-8786</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">E-mail</h4>
                    <p className="text-gray-700">contato@canaldoprovedor.net.br</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">CNPJ</h4>
                    <p className="text-gray-700">39.945.364/0001-80</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-brand-darkblue mb-4">Nos Siga</h3>
              <div className="flex space-x-4">
                <a href="https://www.youtube.com/@canaldoprovedorbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
