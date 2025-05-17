
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import AntiBotVerification from "./AntiBotVerification";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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

  const handleAntiBotVerified = (verified: boolean) => {
    setAntiBot(prev => ({ ...prev, verified }));
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
        
        <AntiBotVerification 
          number1={antiBot.number1}
          number2={antiBot.number2}
          isVerified={antiBot.verified}
          onVerify={handleAntiBotVerified}
          onRegenerate={regenerateCaptcha}
        />
        
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
  );
};

export default ContactForm;
