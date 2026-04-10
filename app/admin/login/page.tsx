"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/actions/admin";
import type { ActionResult } from "@/types";
import { Lock } from "lucide-react";

const initialState: ActionResult = { success: false, message: "" };

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl border border-[rgba(201,169,110,0.3)] flex items-center justify-center mx-auto mb-4">
            <span className="font-serif text-[#C9A96E] text-2xl font-bold">P</span>
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#F0EBE1]">Primor Admin</h1>
          <p className="text-[#8B8075] text-sm mt-1">Acesso restrito</p>
        </div>

        <div className="card-dark p-8">
          {state.message && !state.success && (
            <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm text-center">
              {state.message}
            </div>
          )}

          <form action={action} className="space-y-5">
            <div>
              <label className="label-dark" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-dark"
                placeholder="admin@primorholding.com.br"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="label-dark" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input-dark"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn-gold w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              {pending ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
