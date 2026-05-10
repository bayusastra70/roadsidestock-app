"use client";

import BottomNav from "@/components/BottomNav";
import { logoutAksi, getProfileData } from "../actions/auth-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Cukup satu import ini saja

export default function ProfilPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const profile = await getProfileData();
      if (!profile) {
        router.push("/login");
      } else {
        setData(profile);
      }
    }
    loadData();
  }, [router]);

  const handleLogout = async () => {
    Swal.fire({
      title: "Mau keluar, Bli?",
      text: "Pastikan semua jualan sudah tercatat nggih!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      borderRadius: "25px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutAksi();
        router.push("/login");
        router.refresh();
      }
    });
  };

  if (!data) return <div className="p-10 text-center font-bold text-gray-400 animate-pulse">Memuat Profil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-40 font-sans text-black">
      {/* Header Profil */}
      <div className="p-10 bg-white border-b border-gray-100 text-center shadow-sm">
        <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl shadow-blue-100 uppercase">
          {data.user?.nama?.charAt(0) || "W"}
        </div>
        <h1 className="text-2xl font-black text-gray-800 italic">{data.nama}</h1>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
          Pemilik: {data.user?.nama}
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="ml-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Detail Warung</h2>
          <div className="bg-white rounded-[30px] border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-50 flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-400 uppercase">Email Login</span>
              <span className="text-sm font-bold text-gray-800">{data.user?.email}</span>
            </div>
            <div className="p-5 border-b border-gray-50 flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-400 uppercase">Lokasi / Alamat</span>
              <span className="text-sm font-bold text-gray-800">{data.alamat || "Tabanan, Bali"}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-600 p-5 rounded-[25px] font-black border border-red-100 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3 mt-8"
        >
          LOGOUT DARI APLIKASI
        </button>
      </div>
      <BottomNav />
    </div>
  );
}