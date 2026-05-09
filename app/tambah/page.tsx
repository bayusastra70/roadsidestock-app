// Simpan di: app/tambah/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { tambahAksi } from "../actions/product-actions";

export default function TambahBarang() {
  const router = useRouter();
  const categories = ["Sembako", "Minuman", "Makanan", "Rokok", "Alat Mandi", "Lainnya"];

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-8">Tambah Stok</h1>
        <form action={tambahAksi} className="flex flex-col gap-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Nama Barang</label>
            <input name="nama" type="text" placeholder="Kopi Bali" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Kategori</label>
            <select name="category" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-bold">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Harga Jual</label>
              <input name="harga" type="number" placeholder="15000" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Stok Awal</label>
              <input name="stok" type="number" placeholder="10" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => router.push("/")} className="flex-1 bg-gray-100 p-4 rounded-2xl font-bold">Batal</button>
            <button type="submit" className="flex-[2] bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-blue-100">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}