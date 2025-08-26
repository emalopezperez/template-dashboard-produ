import {
  Home,
  Inbox,
  Search,
  Settings,
  Briefcase,
  FileText,
  User,
  Building,
  BarChart,
  Building2,
  Calendar,
  PanelsTopLeft,
  Circle,
  BarChart4,
  ShieldCheck,
  Users2,
  BookAIcon,
  InfoIcon,
} from "lucide-react";

export const dataSidebar = [
  {
    href: "/dashboard",
    icon: PanelsTopLeft,
    label: "Dashboard",
  },
  

  {
    href: "/dashboard/events",
    icon: Calendar,
    label: "Eventos",
    subItems: [
      { label: "Todos los eventos", href: "/dashboard/events", icon: Calendar },
      {
        label: "Crear evento",
        href: "/dashboard/events/create-events",
        icon: Calendar,
      },
    ],
  },
  {
    href: "/dashboard/bookins",
    icon: Calendar,
    label: "Bookins",
  },

  {
    href: "/dashboard/users",
    icon: Users2,
    label: "Users",
  },
];

export const dataToolsSidebar = [
  {
    href: "/",
    icon: BarChart4,
    label: "Analitycs",
  },
  {
    href: "/",
    icon: InfoIcon,
    label: "Faqs",
  },
];

export const dataSupportSidebar = [
  {
    href: "/",
    icon: Settings,
    label: "Setting",
  },
  {
    href: "/",
    icon: ShieldCheck,
    label: "Security",
  },
];

export const dataCardSumary = [
  {
    icon: User,
    total: "1,200",
    avarage: 100,
    title: "Clients",
    tooltipText: "Total number of clients",
  },
  {
    icon: FileText,
    total: "300",
    avarage: 25,
    title: "Active Cases",
    tooltipText: "Total number of active cases",
  },
  {
    icon: Briefcase,
    total: "50",
    avarage: 5,
    title: "Lawyers",
    tooltipText: "Total number of lawyers",
  },
];

export const days = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

export const hours = Array.from({ length: 24 }, (_, i) => i)
  .map((hour) => [
    `${hour.toString().padStart(2, "0")}:00`,
    `${hour.toString().padStart(2, "0")}:30`,
  ])
  .flat();
