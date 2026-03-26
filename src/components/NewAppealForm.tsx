import { useState } from "react";
import { AppealCategory, categoryLabels, districts } from "@/data/appeals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface NewAppealFormProps {
  onClose: () => void;
}

const NewAppealForm = ({ onClose }: NewAppealFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<AppealCategory | "">("");
  const [district, setDistrict] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !district || !author) {
      toast.error("Заполните все поля");
      return;
    }
    toast.success("Наказ успешно отправлен!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">Ваше имя</label>
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Иванов И.И." className="bg-secondary border-border" />
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">Заголовок</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Кратко опишите проблему" className="bg-secondary border-border" />
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">Описание</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Подробно опишите ситуацию..." className="bg-secondary border-border min-h-[100px]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Категория</label>
          <Select value={category} onValueChange={(v) => setCategory(v as AppealCategory)}>
            <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Выберите" /></SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Район</label>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Выберите" /></SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Отмена</Button>
        <Button type="submit" className="flex-1 gradient-primary text-primary-foreground">
          <Send className="w-4 h-4 mr-2" /> Отправить
        </Button>
      </div>
    </form>
  );
};

export default NewAppealForm;
