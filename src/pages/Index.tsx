import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CityMap from "@/components/CityMap";
import AppealCard from "@/components/AppealCard";
import AppealFilters from "@/components/AppealFilters";
import NewAppealForm from "@/components/NewAppealForm";
import Analytics from "@/components/Analytics";
import { mockAppeals, Appeal, AppealCategory, AppealStatus } from "@/data/appeals";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, ListFilter, BarChart3, Plus, Shield } from "lucide-react";

const Index = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<AppealCategory | "all">("all");
  const [status, setStatus] = useState<AppealStatus | "all">("all");
  const [district, setDistrict] = useState("all");
  const [selectedAppeal, setSelectedAppeal] = useState<Appeal | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const filtered = useMemo(() => {
    return mockAppeals.filter((a) => {
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && a.category !== category) return false;
      if (status !== "all" && a.status !== status) return false;
      if (district !== "all" && a.district !== district) return false;
      return true;
    });
  }, [search, category, status, district]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Map className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Народная программа</h1>
              <p className="text-xs text-muted-foreground">Нижний Новгород</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowNewForm(true)} size="sm" className="gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" /> Новый наказ
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <Shield className="w-4 h-4 mr-1" /> Админ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6">
        <Tabs defaultValue="map" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <TabsList className="bg-secondary">
              <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Map className="w-4 h-4 mr-1" /> Карта
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ListFilter className="w-4 h-4 mr-1" /> Список
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart3 className="w-4 h-4 mr-1" /> Аналитика
              </TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <AppealFilters
                search={search} onSearchChange={setSearch}
                category={category} onCategoryChange={setCategory}
                status={status} onStatusChange={setStatus}
                district={district} onDistrictChange={setDistrict}
              />
            </div>
          </div>

          <TabsContent value="map" className="mt-0">
            <div className="grid lg:grid-cols-[1fr_380px] gap-4 h-[calc(100vh-200px)]">
              <CityMap appeals={filtered} selectedAppeal={selectedAppeal} onAppealClick={setSelectedAppeal} />
              <div className="overflow-y-auto space-y-3 pr-1">
                <p className="text-xs text-muted-foreground">{filtered.length} обращений найдено</p>
                {filtered.map((appeal) => (
                  <AppealCard
                    key={appeal.id}
                    appeal={appeal}
                    isSelected={selectedAppeal?.id === appeal.id}
                    onClick={() => setSelectedAppeal(appeal)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((appeal) => (
                <AppealCard key={appeal.id} appeal={appeal} onClick={() => setSelectedAppeal(appeal)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>

      {/* New appeal dialog */}
      <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Новый наказ</DialogTitle>
          </DialogHeader>
          <NewAppealForm onClose={() => setShowNewForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
