
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  created_at: string;
  replied_to: boolean;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchSubmissions();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchSubmissions();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Erro ao carregar mensagens",
        description: "Não foi possível carregar as mensagens de contato.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ replied_to: true })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, replied_to: true } : sub
      ));
      
      toast({
        title: "Atualizado",
        description: "Marcado como respondido com sucesso.",
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o estado.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoggingIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo à área administrativa.",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Erro de login",
        description: error.message || "Ocorreu um erro durante o login. Verifique suas credenciais.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setSubmissions([]);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  // Not authenticated, show login page
  if (!session) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-2xl font-bold mb-6">Área Administrativa</h1>
          <p className="mb-6 text-gray-600">Faça login para acessar as mensagens de contato.</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="seu@email.com" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          placeholder="•••••••" 
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-2"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            Para teste, use: admin@example.com / password
          </p>
        </div>
      </div>
    );
  }

  // Already authenticated, show admin dashboard
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área Administrativa</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Mensagens de Contato</h2>
        
        {loading ? (
          <div className="text-center py-8">Carregando mensagens...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhuma mensagem encontrada.</div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div 
                key={submission.id} 
                className={`bg-gray-50 rounded-lg p-6 ${submission.replied_to ? 'border-l-4 border-green-500' : 'border-l-4 border-amber-500'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-medium">{submission.name}</h3>
                    <p className="text-gray-500">{submission.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="mt-1">
                      {submission.replied_to ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Respondido
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Pendente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email:</p>
                    <p className="text-gray-800">{submission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefone:</p>
                    <p className="text-gray-800">{submission.phone}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Mensagem:</h4>
                  <p className="text-gray-800 whitespace-pre-line">{submission.message}</p>
                </div>
                
                {!submission.replied_to && (
                  <div className="mt-6 flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => markAsReplied(submission.id)}
                    >
                      Marcar como respondido
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
