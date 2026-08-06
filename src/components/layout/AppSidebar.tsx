import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Library,
  NotebookPen,
  Settings,
  Sparkles,
} from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const principal = [{ title: "Inicio", url: "/dashboard", icon: LayoutDashboard }];

const pedagogia = [
  { title: "Proyectos de Aula", url: "/dashboard", icon: BookOpen },
  { title: "IA Pedagógica", url: "/dashboard", icon: Sparkles },
  { title: "Planeación", url: "/dashboard", icon: NotebookPen },
  { title: "Sesiones", url: "/dashboard", icon: ClipboardList },
];

const organizacion = [
  { title: "Agenda Docente", url: "/dashboard", icon: CalendarDays },
  { title: "Biblioteca", url: "/dashboard", icon: Library },
  { title: "Administración", url: "/dashboard", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const renderGroup = (label: string, items: typeof principal) => (
    <SidebarGroup>
      {!collapsed ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url && item.title === "Inicio"}>
                <Link to={item.url} className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <BrandLogo size="sm" showWordmark={!collapsed} showTelesecundaria={false} inverted />
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("General", principal)}
        {renderGroup("Pedagogía", pedagogia)}
        {renderGroup("Organización", organizacion)}
      </SidebarContent>
    </Sidebar>
  );
}