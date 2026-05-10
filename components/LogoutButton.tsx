"use client";

import { logoutAksi } from "@/app/actions/auth-actions"; // Pastikan aksi ini ada

export default function LogoutButton() {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Panggil server action jika perlu menghapus session di DB/Cookie
    await logoutAksi(); 
    
    // Hard redirect agar session benar-benar bersih di browser iOS
    window.location.href = "/login";
  };

  return (
    <button 
      type="button"
      onClick={handleLogout}
      className="w-full bg-white border-2 border-red-100 text-red-500 p-5 rounded-[30px] font-black active:bg-red-50 transition-all touch-manipulation flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      KELUAR APLIKASI
    </button>
  );
}