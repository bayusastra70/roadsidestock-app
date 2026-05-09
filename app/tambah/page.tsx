"use client"; // Menandakan ini komponen interaktif

import { useRouter } from "next/navigation";
import { tambahAksi } from "../tambah/action"; // Kita pindahkan logikanya ke file sebelah

export default function TambahBarang() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tambah Stok</h1>
        <p className="text-gray-500 mb-8 text-sm">Masukkan detail barang dagangan baru Bli.</p>
        
        {/* Gunakan action dari file terpisah */}
        <form action={tambahAksi} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Nama Barang</label>
            <input 
              name="nama" 
              type="text"
              placeholder="Contoh: Kopi Bubuk Bali" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Harga Jual (Rp)</label>
            <input 
              name="harga" 
              type="number"
              placeholder="15000" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Stok Awal</label>
            <input 
              name="stok" 
              type="number"
              placeholder="10" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
              required 
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => router.push("/")} // Sekarang onClick ini akan berfungsi!
              className="flex-1 bg-gray-100 text-gray-600 p-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-[2] bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Simpan Barang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}