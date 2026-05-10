import prisma from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import SearchInput from "@/components/SearchInput";
import BottomNav from "@/components/BottomNav";
import { jualAksi } from "./actions/product-actions";

const CATEGORIES = ["Semua", "Sembako", "Minuman", "Makanan", "Rokok", "Alat Mandi", "Lainnya"];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  // 1. CEK AUTHENTICATION (Cookies)
  const cookieStore = await cookies();
  const warungId = cookieStore.get("warungId")?.value;

  // Jika tidak ada warungId (belum login), redirect ke halaman login
  if (!warungId) {
    redirect("/login");
  }

  const { q, cat } = await searchParams;
  const currentCat = cat || "Semua";

  // 2. DATA RINGKASAN (Hanya milik warung ini)
  const allProducts = await prisma.product.findMany({
    where: { warungId: warungId }
  });
  
  const totalAset = allProducts.reduce((acc, item) => acc + (item.stock * item.priceSell), 0);
  
  // 3. HITUNG OMZET HARI INI (Hanya milik warung ini)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const transToday = await prisma.transaction.findMany({
    where: { 
      product: { warungId: warungId }, // Filter lewat relasi produk
      createdAt: { gte: startOfDay } 
    }
  });
  const omzetHariIni = transToday.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // 4. DAFTAR PRODUK YANG DIFILTER (Hanya milik warung ini)
  const products = await prisma.product.findMany({
    where: {
      warungId: warungId, // PROTEKSI DATA: Pastikan ID warung cocok
      AND: [
        { name: { contains: q || "", mode: "insensitive" } },
        currentCat !== "Semua" ? { category: currentCat } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-40 font-sans text-black">
      {/* HEADER STICKY */}
      <div className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-blue-600 italic">Roadside Stock</h1>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Tabanan, Bali</p>
          </div>
          <Link href="/tambah" className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </Link>
        </div>
        <SearchInput defaultValue={q} />
      </div>

      <div className="p-6 space-y-6">
        {/* FILTER KATEGORI */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((c) => (
            <Link 
              key={c} 
              href={`/?cat=${c}${q ? `&q=${q}` : ''}`} 
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${currentCat === c ? "bg-blue-600 text-white" : "bg-white text-gray-400 border border-gray-100 shadow-sm"}`}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* DASHBOARD STATS */}
        {!q && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-600 p-4 rounded-[25px] text-white shadow-xl shadow-green-100">
              <p className="text-[10px] font-bold opacity-70 uppercase">Omzet Hari Ini</p>
              <p className="text-lg font-black">Rp {omzetHariIni.toLocaleString("id-ID")}</p>
            </div>
            <div className="bg-white p-4 rounded-[25px] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Nilai Aset</p>
              <p className="text-lg font-black text-gray-800">Rp {totalAset.toLocaleString("id-ID")}</p>
            </div>
          </div>
        )}

        {/* LIST PRODUK */}
        <div className="grid gap-4">
          <h2 className="font-bold text-gray-700 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Daftar Stok Barang
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium">Barang tidak ditemukan</p>
              <p className="text-[10px] text-gray-300 mt-1">Silakan tambah barang baru Bli.</p>
            </div>
          ) : (
            products.map((product) => {
              const isLowStock = product.stock <= product.minStock;
              return (
                <div key={product.id} className={`bg-white p-5 rounded-3xl shadow-sm border flex flex-col gap-4 transition-all ${isLowStock ? 'border-orange-200 bg-orange-50/20' : 'border-gray-100 hover:border-blue-100'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 text-base">{product.name}</h3>
                      <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">{product.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/edit/${product.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-xl active:scale-90 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </Link>
                      <DeleteButton id={product.id} namaBarang={product.name} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                    <div className="flex flex-col">
                      <span className={`text-xs font-black ${isLowStock ? 'text-orange-600' : 'text-blue-600'}`}>
                        {product.stock} Pcs {isLowStock && "⚠️"}
                      </span>
                      <span className="text-xs font-bold text-green-600">Rp {product.priceSell.toLocaleString("id-ID")}</span>
                    </div>

                    {/* FORM JUAL CEPAT */}
                    <form action={jualAksi} className="flex bg-gray-50 rounded-2xl p-1 border border-gray-100 items-center">
                      <input type="hidden" name="productId" value={product.id} />
                      <input 
                        name="qty" 
                        type="number" 
                        defaultValue="1" 
                        min="1" 
                        max={product.stock} 
                        className="w-10 bg-transparent text-center text-sm font-bold outline-none" 
                      />
                      <button 
                        type="submit" 
                        disabled={product.stock <= 0}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black active:scale-95 transition-all ${product.stock <= 0 ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white shadow-md shadow-blue-100'}`}
                      >
                        {product.stock <= 0 ? 'HABIS' : 'JUAL'}
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}