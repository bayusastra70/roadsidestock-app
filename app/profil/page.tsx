// app/profil/page.tsx
import BottomNav from "@/components/BottomNav";
import { getProfileData } from "../actions/auth-actions";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton"; // Kita pindahkan tombol ke komponen terpisah

export default async function ProfilPage() {
  const data = await getProfileData();

  if (!data) {
    redirect("/login");
  }

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
            <div className="p-5 flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-400 uppercase">Lokasi / Alamat</span>
              <span className="text-sm font-bold text-gray-800">{data.alamat || "Tabanan, Bali"}</span>
            </div>
          </div>
        </div>

        {/* Tombol Logout dipisah ke Client Component */}
        <LogoutButton />
        
        <p className="text-center text-[10px] text-gray-300 font-black uppercase tracking-tighter pt-6">
          Roadside Stock &copy; 2026 - Tabanan
        </p>
      </div>
      <BottomNav />
    </div>
  );
}