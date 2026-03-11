"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("primor:cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("primor:cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("primor:cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-gold/20 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-slate">
          Usamos cookies para melhorar sua experiencia. Ao continuar navegando,
          voce concorda com nossa{" "}
          <Link
            href="/privacidade"
            className="text-gold hover:text-gold-light underline transition-colors"
          >
            Politica de Privacidade
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="primary" onClick={accept}>
            Aceitar
          </Button>
          <Button size="sm" variant="ghost" onClick={reject}>
            Recusar
          </Button>
        </div>
      </div>
    </div>
  );
}
