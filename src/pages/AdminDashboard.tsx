import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { mockAppeals, categoryLabels, statusLabels, AppealStatus } from "@/data/appeals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, BarChart3, List, Settings } from "lucide-react";
import Analytics from "@/components/Analytics";
import { toast } from "sonner";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  in_progress: "secondary",
  resolved: "outline",
  rejected: "destructive",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAuth = sessionStorage.getItem("admin_auth") === "true";
  const [tab, setTab] = useState<"list" | "analytics">("list");
  const [appeals] = useState(mockAppeals);

  if (!isAuth) {
    return <Navigate to="/admin" />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    toast.info("Вы вышли из системы");
    navigate("/admin");
  };

  const handleStatusChange = (id: string, newStatus: AppealStatus) => {
    toast.success(`Статус обращения #${id} изменён на "${statusLabels[newStatus]}"`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-foreground">Админ-панель</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={tab === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTab("list")}
              className={tab === "list" ? "gradient-primary text-primary-foreground" : ""}
            >
              <List className="w-4 h-4 mr-1" /> Обращения
            </Button>
            <Button
              variant={tab === "analytics" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTab("analytics")}
              className={tab === "analytics" ? "gradient-primary text-primary-foreground" : ""}
            >
              <BarChart3 className="w-4 h-4 mr-1" /> Аналитика
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {tab === "analytics" ? (
          <Analytics />
        ) : (
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">ID</TableHead>
                  <TableHead className="text-muted-foreground">Наказ</TableHead>
                  <TableHead className="text-muted-foreground">Категория</TableHead>
                  <TableHead className="text-muted-foreground">Район</TableHead>
                  <TableHead className="text-muted-foreground">Голоса</TableHead>
                  <TableHead className="text-muted-foreground">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appeals.map((appeal) => (
                  <TableRow key={appeal.id} className="border-border">
                    <TableCell className="text-muted-foreground font-mono text-xs">#{appeal.id}</TableCell>
                    <TableCell>
                      <p className="font-medium text-sm text-foreground">{appeal.title}</p>
                      <p className="text-xs text-muted-foreground">{appeal.author} • {new Date(appeal.date).toLocaleDateString("ru-RU")}</p>
                    </TableCell>
                    <TableCell className="text-sm">{categoryLabels[appeal.category]}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{appeal.district}</TableCell>
                    <TableCell className="text-sm text-primary font-medium">{appeal.votes}</TableCell>
                    <TableCell>
                      <Select defaultValue={appeal.status} onValueChange={(v) => handleStatusChange(appeal.id, v as AppealStatus)}>
                        <SelectTrigger className="w-[130px] h-8 text-xs bg-secondary border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
