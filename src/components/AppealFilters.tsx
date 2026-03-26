import { AppealCategory, AppealStatus, categoryLabels, statusLabels, districts } from "@/data/appeals";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AppealFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: AppealCategory | "all";
  onCategoryChange: (v: AppealCategory | "all") => void;
  status: AppealStatus | "all";
  onStatusChange: (v: AppealStatus | "all") => void;
  district: string;
  onDistrictChange: (v: string) => void;
}

const AppealFilters = ({
  search, onSearchChange,
  category, onCategoryChange,
  status, onStatusChange,
  district, onDistrictChange,
}: AppealFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по наказам..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-secondary border-border"
        />
      </div>
      <Select value={category} onValueChange={(v) => onCategoryChange(v as AppealCategory | "all")}>
        <SelectTrigger className="w-[160px] bg-secondary border-border">
          <SelectValue placeholder="Категория" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все категории</SelectItem>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={(v) => onStatusChange(v as AppealStatus | "all")}>
        <SelectTrigger className="w-[140px] bg-secondary border-border">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          {Object.entries(statusLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={district} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-[170px] bg-secondary border-border">
          <SelectValue placeholder="Район" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все районы</SelectItem>
          {districts.map((d) => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppealFilters;
