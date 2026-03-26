import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  if (isAuth) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === "super" && password === "komanda") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuth(true);
      toast.success("Добро пожаловать, администратор!");
    } else {
      toast.error("Неверный логин или пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Админ-панель</h1>
          <p className="text-sm text-muted-foreground mt-1">Народная программа Нижнего Новгорода</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" className="pl-9 bg-secondary border-border" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" className="pl-9 bg-secondary border-border" />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">Войти</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
