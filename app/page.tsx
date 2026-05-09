import prisma from "@/lib/prisma";
import Link from "next/link";
import { hapusBarangAksi } from "./actions/delete-product";

export default async function HomePage() {
  // Ambil semua produk dari database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-black">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold text-blue-600">Roadside Stock</h1>
        <p className="text-gray-400 text-xs">Aplikasi Stok UMKM Bali</p>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Stok Barang</h2>
          <Link 
            href="/tambah" 
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md shadow-blue-100"
          >
            + Barang
          </Link>
        </div>

        <div className="grid gap-4">
          {products.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400">Belum ada barang di database.</p>
            </div>
          ) : (
            products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-semibold">
                      Stok: {product.stock}
                    </span>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-lg font-semibold">
                      Rp {product.priceSell.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Tombol Hapus dengan Server Action */}
                <form action={async () => {
                  "use server";
                  await hapusBarangAksi(product.id);
                }}>
                  <button 
                    type="submit"
                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigasi Bawah Sesuai Screenshot */}
      <div className="fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md border border-gray-100 p-4 rounded-3xl shadow-xl flex justify-around items-center">
         <div className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mb-1"></div>
            <span className="text-[10px] font-bold text-blue-600">Beranda</span>
         </div>
         <div className="flex flex-col items-center gap-1 opacity-40">
            <span className="text-[10px] font-bold">Laporan</span>
         </div>
         <div className="flex flex-col items-center gap-1 opacity-40">
            <span className="text-[10px] font-bold">Profil</span>
         </div>
      </div>
    </div>
  );
}