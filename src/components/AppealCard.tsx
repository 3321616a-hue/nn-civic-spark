import { Appeal, categoryLabels, statusLabels, categoryColors } from "@/data/appeals";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MapPin, Calendar } from "lucide-react";

interface AppealCardProps {
  appeal: Appeal;
  isSelected?: boolean;
  onClick?: () => void;
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  in_progress: "secondary",
  resolved: "outline",
  rejected: "destructive",
};

const AppealCard = ({ appeal, isSelected, onClick }: AppealCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-4 cursor-pointer transition-all duration-200 hover:border-primary/50 ${
        isSelected ? "border-primary ring-1 ring-primary/30" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-sm text-foreground leading-tight">{appeal.title}</h3>
        <Badge variant={statusVariant[appeal.status]} className="shrink-0 text-xs">
          {statusLabels[appeal.status]}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{appeal.description}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: categoryColors[appeal.category] + "20",
            color: categoryColors[appeal.category],
          }}
        >
          {categoryLabels[appeal.category]}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {appeal.district}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(appeal.date).toLocaleDateString("ru-RU")}
        </span>
        <span className="flex items-center gap-1 ml-auto text-primary">
          <ThumbsUp className="w-3 h-3" />
          {appeal.votes}
        </span>
      </div>
    </div>
  );
};

export default AppealCard;
