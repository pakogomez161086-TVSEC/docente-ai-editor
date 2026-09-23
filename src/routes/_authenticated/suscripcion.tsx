import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, CreditCard, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/suscripcion")({
  head: () => ({
    meta: [
      { title: "Mi suscripción — DocentePRO Telesecundaria" },
      {
        name: "description",
        content:
          "Consulta el estado de tu suscripción, los días restantes y los planes disponibles de DocentePRO.",
      },
      { property: "og:title", content: "Mi suscripción — DocentePRO Telesecundaria" },
      { property: "og:description", content: "Estado de tu plan y opciones de renovación." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SuscripcionPage,
});

const PERIODO_LABEL: Record<string, string> = {
  mensual: "por mes",
  semestral: "por 6 meses",
  anual: "por año",
};

const mxn = (valor: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(
    valor,
  );

function diasRestantes(termina: string | null) {
  if (!termina) return null;
  const ms = new Date(termina).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

function SuscripcionPage() {
  const { user } = useAuth();

  const suscripcion = useQuery({
    queryKey: ["mi-suscripcion", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suscripciones")
        .select("id, estado, inicia_en, termina_en, monto, metodo_pago, plan_id, planes(nombre, periodo)")
        .eq("user_id", user!.id)
        .order("inicia_en", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const planes = useQuery({
    queryKey: ["planes-suscripcion"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("planes")
        .select("*")
        .eq("activo", true)
        .order("orden");
      if (error) throw error;
      return data;
    },
  });

  const activa = suscripcion.data?.estado === "activa";
  const dias = diasRestantes(suscripcion.data?.termina_en ?? null);

  return (
    <DashboardShell titulo="Mi suscripción" subtitulo="Estado de tu plan y opciones de renovación">
      <Card className="border-border/70 shadow-soft">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardDescription>Estado actual</CardDescription>
              <CardTitle className="font-display text-2xl">
                {activa
                  ? (suscripcion.data?.planes?.nombre ?? "Plan activo")
                  : suscripcion.data
                    ? "Suscripción vencida"
                    : "Sin suscripción activa"}
              </CardTitle>
            </div>
            <Badge variant={activa ? "secondary" : "outline"} className="gap-1.5">
              {activa ? <BadgeCheck className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
              {activa ? "Activa" : "Inactiva"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground">Inicio</p>
              <p className="font-medium">
                {suscripcion.data?.inicia_en
                  ? new Date(suscripcion.data.inicia_en).toLocaleDateString("es-MX")
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Vence</p>
              <p className="font-medium">
                {suscripcion.data?.termina_en
                  ? new Date(suscripcion.data.termina_en).toLocaleDateString("es-MX")
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Días restantes</p>
              <p className="font-medium">{dias === null ? "—" : `${dias} días`}</p>
            </div>
          </div>
          {!activa ? (
            <>
              <Separator />
              <p className="text-muted-foreground">
                Elige un plan para mantener acceso ilimitado a la generación de planeaciones, sesiones e
                instrumentos de evaluación.
              </p>
            </>
          ) : null}
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {(planes.data ?? []).map((p) => {
          const precio =
            p.promocion_activa && p.precio_promocion != null ? Number(p.precio_promocion) : Number(p.precio);
          const destacado = p.periodo === "semestral";
          return (
            <Card
              key={p.id}
              className={`shadow-soft ${destacado ? "border-primary ring-1 ring-primary/30" : "border-border/70"}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{p.nombre}</CardTitle>
                  {destacado ? <Badge className="gap-1"><Sparkles className="h-3 w-3" />Popular</Badge> : null}
                </div>
                <p className="pt-1 font-display text-3xl">
                  {mxn(precio)}
                  <span className="text-sm text-muted-foreground"> {PERIODO_LABEL[p.periodo] ?? p.periodo}</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {p.beneficios.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={destacado ? "default" : "outline"}
                  onClick={() =>
                    toast.info("Pagos en línea muy pronto", {
                      description:
                        "Estamos activando el cobro con tarjeta. Mientras tanto, escríbenos para activar tu plan manualmente.",
                    })
                  }
                >
                  Elegir {p.nombre}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </DashboardShell>
  );
}
