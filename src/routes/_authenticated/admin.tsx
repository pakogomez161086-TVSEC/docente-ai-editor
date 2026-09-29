import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldAlert, Users } from "lucide-react";
import { toast } from "sonner";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const MESES: Record<string, number> = { mensual: 1, semestral: 6, anual: 12 };

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administración — DocentePRO Telesecundaria" },
      {
        name: "description",
        content: "Panel de administración: docentes registrados, planes y suscripciones de la plataforma.",
      },
      { property: "og:title", content: "Administración — DocentePRO" },
      { property: "og:description", content: "Gestiona cuentas, planes y suscripciones." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin } = useAuth();

  const docentes = useQuery({
    queryKey: ["admin-docentes"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, nombre_completo, escuela, cct, grado, estado, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const planes = useQuery({
    queryKey: ["admin-planes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("planes").select("*").order("orden");
      if (error) throw error;
      return data;
    },
  });

  const queryClient = useQueryClient();

  const subs = useQuery({
    queryKey: ["admin-suscripciones"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suscripciones")
        .select("id, user_id, estado, termina_en")
        .order("inicia_en", { ascending: false });
      if (error) throw error;
      const porUsuario: Record<string, (typeof data)[number]> = {};
      for (const s of data) if (!porUsuario[s.user_id]) porUsuario[s.user_id] = s;
      return porUsuario;
    },
  });

  const activar = useMutation({
    mutationFn: async ({ userId, plan }: { userId: string; plan: { id: string; periodo: string; precio: number } }) => {
      const meses = MESES[plan.periodo] ?? 1;
      const inicio = new Date();
      const fin = new Date(inicio);
      fin.setMonth(fin.getMonth() + meses);
      const { error } = await supabase.from("suscripciones").insert({
        user_id: userId,
        plan_id: plan.id,
        estado: "activa",
        inicia_en: inicio.toISOString(),
        termina_en: fin.toISOString(),
        monto: Number(plan.precio),
        metodo_pago: "manual",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Plan activado");
      void queryClient.invalidateQueries({ queryKey: ["admin-suscripciones"] });
    },
    onError: (e: Error) => toast.error("No se pudo activar", { description: e.message }),
  });

  const cancelar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("suscripciones")
        .update({ estado: "cancelada", termina_en: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Suscripción cancelada");
      void queryClient.invalidateQueries({ queryKey: ["admin-suscripciones"] });
    },
    onError: (e: Error) => toast.error("No se pudo cancelar", { description: e.message }),
  });

  if (!isAdmin) {
    return (
      <DashboardShell titulo="Administración" subtitulo="Acceso restringido">
        <Card className="border-dashed shadow-soft">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <p className="font-semibold">Solo administradores</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Este panel está reservado para la cuenta administradora de DocentePRO.
            </p>
          </CardContent>
        </Card>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell titulo="Administración" subtitulo="Docentes, planes y suscripciones">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/70 shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription>Docentes registrados</CardDescription>
            <CardTitle className="font-display text-3xl">{docentes.data?.length ?? 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border/70 shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription>Cuentas activas</CardDescription>
            <CardTitle className="font-display text-3xl">
              {(docentes.data ?? []).filter((d) => d.estado === "activo").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border/70 shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription>Planes disponibles</CardDescription>
            <CardTitle className="font-display text-3xl">{planes.data?.length ?? 0}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-border/70 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4" />
            Docentes
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Escuela</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Suscripción</TableHead>
                <TableHead>Activar plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(docentes.data ?? []).map((d) => {
                const s = subs.data?.[d.id];
                const vigente = s && s.estado === "activa" && s.termina_en && new Date(s.termina_en) > new Date();
                return (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.nombre_completo ?? "—"}</TableCell>
                    <TableCell>{d.email}</TableCell>
                    <TableCell>{d.escuela ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={d.estado === "activo" ? "secondary" : "outline"}>{d.estado}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {vigente ? (
                        <span>
                          Activa hasta {new Date(s!.termina_en!).toLocaleDateString("es-MX")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Sin plan vigente</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {(planes.data ?? []).map((p) => (
                          <Button
                            key={p.id}
                            size="sm"
                            variant="outline"
                            disabled={activar.isPending}
                            onClick={() => activar.mutate({ userId: d.id, plan: p })}
                          >
                            {p.nombre}
                          </Button>
                        ))}
                        {vigente ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={cancelar.isPending}
                            onClick={() => cancelar.mutate(s!.id)}
                          >
                            Cancelar
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Planes y precios</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {(planes.data ?? []).map((p) => (
            <div key={p.id} className="rounded-xl border bg-muted/40 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{p.nombre}</p>
                {p.promocion_activa ? <Badge>Promoción</Badge> : null}
              </div>
              <p className="pt-1 font-display text-2xl">
                ${p.promocion_activa && p.precio_promocion != null ? p.precio_promocion : p.precio}
                <span className="text-sm text-muted-foreground"> / {p.periodo}</span>
              </p>
              <ul className="space-y-1 pt-2 text-sm text-muted-foreground">
                {p.beneficios.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
