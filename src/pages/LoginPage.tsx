
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Formulário de login submetido');
    const success = await login(email, senha);
    
    if (success) {
      toast({
        title: "✅ Login realizado com sucesso!",
        description: "Bem-vindo(a) ao Fique Frida!",
        className: "bg-white border-2 border-frida-green shadow-lg",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "❌ Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        className: "bg-white border-2 border-red-500 shadow-lg",
      });
    }
  };

  return (
    <div className="min-h-screen bg-frida-beige">
      <Header />
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl text-frida-red font-bold mb-2">
              Entrar
            </h1>
            <p className="text-frida-dark/70">
              Acesse sua conta para ver seus projetos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-frida-dark font-medium mb-2">
                <Mail className="inline mr-2" size={16} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-frida-beige rounded-lg focus:border-frida-red outline-none transition-colors"
                placeholder="seu.email@gmail.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-frida-dark font-medium mb-2">
                <Lock className="inline mr-2" size={16} />
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full p-3 border-2 border-frida-beige rounded-lg focus:border-frida-red outline-none transition-colors pr-10"
                  placeholder="Sua senha"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-frida-dark/60"
                  disabled={isLoading}
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" disabled={isLoading} />
                <span className="text-sm text-frida-dark/70">Lembrar de mim</span>
              </label>
              <Link to="/recuperar-senha" className="text-sm text-frida-red hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-frida-red text-white py-3 rounded-lg font-bold text-lg hover:bg-frida-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-frida-dark/70">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-frida-red hover:underline font-medium">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
