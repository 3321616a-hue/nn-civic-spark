export type AppealCategory = 
  | "roads" 
  | "housing" 
  | "ecology" 
  | "transport" 
  | "education" 
  | "healthcare" 
  | "culture" 
  | "safety" 
  | "landscaping" 
  | "utilities";

export type AppealStatus = "new" | "in_progress" | "resolved" | "rejected";

export interface Appeal {
  id: string;
  title: string;
  description: string;
  category: AppealCategory;
  status: AppealStatus;
  district: string;
  lat: number;
  lng: number;
  date: string;
  author: string;
  votes: number;
}

export const categoryLabels: Record<AppealCategory, string> = {
  roads: "Дороги",
  housing: "ЖКХ",
  ecology: "Экология",
  transport: "Транспорт",
  education: "Образование",
  healthcare: "Здравоохранение",
  culture: "Культура",
  safety: "Безопасность",
  landscaping: "Благоустройство",
  utilities: "Коммунальные услуги",
};

export const statusLabels: Record<AppealStatus, string> = {
  new: "Новый",
  in_progress: "В работе",
  resolved: "Решён",
  rejected: "Отклонён",
};

export const categoryColors: Record<AppealCategory, string> = {
  roads: "#ef4444",
  housing: "#f59e0b",
  ecology: "#22c55e",
  transport: "#3b82f6",
  education: "#8b5cf6",
  healthcare: "#ec4899",
  culture: "#14b8a6",
  safety: "#f97316",
  landscaping: "#06b6d4",
  utilities: "#6366f1",
};

export const districts = [
  "Нижегородский",
  "Советский",
  "Приокский",
  "Канавинский",
  "Ленинский",
  "Автозаводский",
  "Сормовский",
  "Московский",
];

// Mock data spread across Nizhny Novgorod
export const mockAppeals: Appeal[] = [
  { id: "1", title: "Ямы на ул. Большая Покровская", description: "Множественные выбоины на центральной улице, затрудняющие движение пешеходов", category: "roads", status: "new", district: "Нижегородский", lat: 56.3269, lng: 43.9503, date: "2025-03-20", author: "Иванов А.П.", votes: 45 },
  { id: "2", title: "Протечка крыши в доме на Минина", description: "Течёт крыша в подъезде №3, вода попадает на верхние этажи", category: "housing", status: "in_progress", district: "Нижегородский", lat: 56.3189, lng: 43.9387, date: "2025-03-18", author: "Петрова М.И.", votes: 32 },
  { id: "3", title: "Загрязнение озера в Щёлоковском хуторе", description: "Сброс мусора в водоём, требуется очистка территории", category: "ecology", status: "new", district: "Советский", lat: 56.2982, lng: 43.9891, date: "2025-03-15", author: "Сидоров К.Л.", votes: 78 },
  { id: "4", title: "Нехватка автобусов маршрута №41", description: "Интервал движения более 40 минут в часы пик", category: "transport", status: "new", district: "Автозаводский", lat: 56.2425, lng: 43.8603, date: "2025-03-22", author: "Козлова Е.В.", votes: 56 },
  { id: "5", title: "Ремонт школы №187", description: "Необходим капитальный ремонт спортзала и замена окон", category: "education", status: "in_progress", district: "Сормовский", lat: 56.3578, lng: 43.8632, date: "2025-03-10", author: "Морозов Д.А.", votes: 23 },
  { id: "6", title: "Очередь в поликлинику №7", description: "Запись к терапевту доступна только через 3 недели", category: "healthcare", status: "new", district: "Канавинский", lat: 56.3302, lng: 43.9148, date: "2025-03-21", author: "Новикова О.С.", votes: 67 },
  { id: "7", title: "Восстановление парка Кулибина", description: "Требуется установка новых скамеек и освещения", category: "landscaping", status: "resolved", district: "Нижегородский", lat: 56.3195, lng: 43.9555, date: "2025-02-28", author: "Волков И.Н.", votes: 89 },
  { id: "8", title: "Освещение на ул. Ванеева", description: "Не работают фонари на протяжении 500 метров", category: "safety", status: "new", district: "Советский", lat: 56.2891, lng: 43.9723, date: "2025-03-19", author: "Лебедева Т.М.", votes: 34 },
  { id: "9", title: "Реставрация Дома культуры", description: "Здание ДК в аварийном состоянии, необходим ремонт фасада", category: "culture", status: "rejected", district: "Ленинский", lat: 56.2567, lng: 43.8901, date: "2025-03-05", author: "Кузнецов В.П.", votes: 12 },
  { id: "10", title: "Замена труб водоснабжения", description: "Ржавая вода из-под крана, частые аварии на магистрали", category: "utilities", status: "in_progress", district: "Московский", lat: 56.2789, lng: 43.8234, date: "2025-03-17", author: "Егорова А.Д.", votes: 91 },
  { id: "11", title: "Детская площадка в Приокском", description: "Сломанные качели и горки, опасно для детей", category: "landscaping", status: "new", district: "Приокский", lat: 56.2650, lng: 43.9450, date: "2025-03-23", author: "Белов С.Г.", votes: 41 },
  { id: "12", title: "Пробки на Мызинском мосту", description: "Ежедневные заторы в часы пик, нужна оптимизация светофоров", category: "transport", status: "new", district: "Приокский", lat: 56.2734, lng: 43.9601, date: "2025-03-24", author: "Фёдоров Р.К.", votes: 103 },
];
