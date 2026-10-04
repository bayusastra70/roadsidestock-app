// components/LogoutButton.tsx
"use client";

import { useTransition } from "react";
import { logoutAksi } from "@/app/actions/auth-actions";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logoutAksi();
        // Redirect bersih yang didukung penuh oleh Safari iOS
        window.location.replace(`/login?logout=${Date.now()}`);
      } catch (err) {
        console.error("Gagal logout:", err);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="w-full py-4 bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 rounded-[20px] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer touch-manipulation select-none"
    >
      {isPending ? "MEMPROSES LOGOUT..." : "KELUAR APLIKASI"}
    </button>
  );
}