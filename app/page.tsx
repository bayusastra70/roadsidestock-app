import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  // Mengambil data produk dan data Warung terkait
  const products = await prisma.product.findMany({
    include: { warung: true },
    orderBy: { createdAt: 'desc' }
  }).catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Roadside Stock</h1>
          <p className="text-sm text-gray-500">Aplikasi Stok UMKM Bali</p>
        </div>
        <Link 
          href="/tambah" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
        >
          + Barang
        </Link>
      </div>

      {/* Daftar Produk */}
      <div className="grid gap-4">
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Belum ada barang di database.</p>
            <p className="text-xs text-gray-400 mt-1">Klik "+ Barang" untuk memulai</p>
          </div>
        ) : (
          products.map((item: any) => (
            <div 
              key={item.id} 
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.stock <= item.minStock ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    Stok: {item.stock}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    {item.warung?.nama || 'Tanpa Warung'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900 text-lg">
                  Rp {item.priceSell.toLocaleString('id-ID')}
                </p>
                <p className="text-[10px] text-gray-400">Modal: Rp {item.priceBuy.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigasi Bawah */}
      <div className="fixed bottom-6 left-0 right-0 px-6">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-gray-100 flex justify-around">
           <Link href="/" className="text-blue-600 flex flex-col items-center">
             <span className="text-xl">🏠</span>
             <span className="text-[10px] font-bold">Beranda</span>
           </Link>
           <div className="text-gray-300 flex flex-col items-center">
             <span className="text-xl">📊</span>
             <span className="text-[10px] font-bold">Laporan</span>
           </div>
           <div className="text-gray-300 flex flex-col items-center">
             <span className="text-xl">👤</span>
             <span className="text-[10px] font-bold">Profil</span>
           </div>
        </div>
      </div>
    </div>
  );
}