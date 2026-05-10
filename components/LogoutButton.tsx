// components/LogoutButton.tsx
"use client";

import { logoutAksi } from "@/app/actions/auth-actions";

export default function LogoutButton() {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await logoutAksi(); 
      // Replace lebih aman dari .href untuk mencegah user "Back" ke sesi lama
      window.location.replace("/login");
    } catch (err) {
      console.error("Gagal logout", err);
    }
  };

  return (
    <button 
  type="button"
  onPointerDown={async (e) => {
    e.preventDefault();
    await logoutAksi();
    window.location.replace(`/login?logout=${new Date().getTime()}`);
  }}
  className="..."
>
  KELUAR APLIKASI
</button>
  );
}