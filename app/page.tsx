import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton"; // Sesuaikan path-nya

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans text-black">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-blue-600 leading-none">Roadside Stock</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-wider">Tabanan, Bali</p>
        </div>
        <Link 
          href="/tambah" 
          className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 active:scale-90 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </Link>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Stok Barang UMKM</h2>

        <div className="grid gap-4">
          {products.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-white">
              <p className="text-gray-400 text-sm">Belum ada barang.<br/>Klik tombol + di atas.</p>
            </div>
          ) : (
            products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center transition-all"
              >
                <div>
                  <h3 className="font-bold text-gray-800 text-base">{product.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[11px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
                      {product.stock} Pcs
                    </span>
                    <span className="text-[11px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold">
                      Rp {product.priceSell.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Tombol Hapus Client Component */}
                <DeleteButton id={product.id} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigasi Bawah - Fixed & Styled */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-transparent pointer-events-none">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-[35px] p-4 flex justify-around items-center pointer-events-auto">
          {/* Home */}
          <div className="flex flex-col items-center gap-1">
            <div className="p-2 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-bold text-blue-600">Beranda</span>
          </div>

          {/* Laporan */}
          <div className="flex flex-col items-center gap-1 group opacity-40">
            <div className="p-2 bg-gray-100 rounded-2xl text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <span className="text-[10px] font-bold text-gray-500">Laporan</span>
          </div>

          {/* Profil */}
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="p-2 bg-gray-100 rounded-2xl text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span className="text-[10px] font-bold text-gray-500">Profil</span>
          </div>
        </div>
      </div>
    </div>
  );
}