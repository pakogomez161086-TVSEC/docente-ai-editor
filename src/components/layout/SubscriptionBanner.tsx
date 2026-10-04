import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const DIAS_PRUEBA = 7;

export function SubscriptionBanner() {
  const { user, isAdmin } = useAuth();

  const sub = useQuery({
    queryKey: ["mi-suscripcion-banner", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suscripciones")
        .select("estado, termina_en")
        .eq("user_id", user!.id)
        .order("inicia_en", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (!user || isAdmin || sub.isLoading) return null;

  const vigente =
    sub.data?.estado === "activa" && sub.data.termina_en && new Date(sub.data.termina_en) > new Date();
  if (vigente) return null;

  const finPrueba = new Date(user.created_at).getTime() + DIAS_PRUEBA * 86_400_000;
  const dias = Math.ceil((finPrueba - Date.now()) / 86_400_000);
  const enPrueba = dias > 0;

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
        enPrueba ? "border-primary/30 bg-accent" : "border-destructive/40 bg-destructive/10"
      }`}
    >
      {enPrueba ? <Sparkles className="h-4 w-4 text-primary" /> : <Clock className="h-4 w-4 text-destructive" />}
      <p className="flex-1">
        {enPrueba
          ? `Prueba gratis: te quedan ${dias} ${dias === 1 ? "día" : "días"}.`
          : "Tu prueba gratis terminó. Elige un plan para seguir usando DocentePRO."}
      </p>
      <Button asChild size="sm" variant={enPrueba ? "outline" : "default"}>
        <Link to="/suscripcion">Ver planes</Link>
      </Button>
    </div>
  );
}
