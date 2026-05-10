"use client";

import { logoutAksi } from "@/app/actions/auth-actions";
import Swal from "sweetalert2";

export default function LogoutButton() {
  const handleLogout = async (e: React.MouseEvent) => {
    // 1. Cegah perilaku default browser & hentikan propagasi
    e.preventDefault();
    e.stopPropagation();

    // 2. Gunakan konfigurasi SweetAlert paling stabil untuk Mobile
    Swal.fire({
      title: "Mau keluar, Bli?",
      text: "Pastikan jualan hari ini sudah aman!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      heightAuto: false, // WAJIB untuk iOS agar tidak scroll loncat
      scrollbarPadding: false,
      returnFocus: false, // Menghindari Safari fokus ke elemen lama yang hilang
      customClass: {
        popup: 'rounded-[30px]',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutAksi();
          // Gunakan hard redirect agar cookie benar-benar bersih di Safari
          window.location.href = "/login";
        } catch (error) {
          console.error("Logout gagal:", error);
        }
      }
    });
  };

  return (
    <button 
      type="button"
      onClick={handleLogout}
      className="w-full bg-white text-red-600 p-5 rounded-[25px] font-black border border-red-100 shadow-sm active:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-3 mt-8 cursor-pointer touch-manipulation"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        WebkitAppearance: 'none' 
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      LOGOUT DARI APLIKASI
    </button>
  );
}