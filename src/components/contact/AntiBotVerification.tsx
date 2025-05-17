
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, RefreshCw } from "lucide-react";

interface AntiBotVerificationProps {
  number1: number;
  number2: number;
  isVerified: boolean;
  onVerify: (verified: boolean) => void;
  onRegenerate: () => void;
}

const AntiBotVerification = ({
  number1,
  number2,
  isVerified,
  onVerify,
  onRegenerate
}: AntiBotVerificationProps) => {
  const { toast } = useToast();
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const verifyAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    const correctAnswer = number1 + number2;
    
    if (parseInt(answer) === correctAnswer) {
      onVerify(true);
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
      onRegenerate();
      setAnswer('');
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Verificação Anti-Bot</h4>
      
      {isVerified ? (
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
            <span className="font-medium">{number1} + {number2} = </span>
            <Input 
              type="number" 
              value={answer}
              onChange={handleAnswerChange}
              className="w-20"
              placeholder="?"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={verifyAnswer}
            >
              Verificar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              title="Gerar novo CAPTCHA"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntiBotVerification;
