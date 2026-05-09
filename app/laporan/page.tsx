// app/laporan/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function LaporanPage() {
  // Ambil semua transaksi, urutkan dari yang terbaru
  const transactions = await prisma.transaction.findMany({
    include: {
      product: true, // Agar kita tahu nama produknya
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Hitung total omzet keseluruhan dari riwayat
  const totalOmzet = transactions.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans text-black">
      <div className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-black text-gray-800">Riwayat Penjualan</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Laporan Transaksi</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Ringkasan Laporan */}
        <div className="bg-blue-600 p-6 rounded-[30px] text-white shadow-xl shadow-blue-100">
          <p className="text-xs font-bold opacity-80 uppercase">Total Penjualan (All Time)</p>
          <p className="text-3xl font-black">Rp {totalOmzet.toLocaleString("id-ID")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-gray-700">Daftar Transaksi</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">Belum ada transaksi terekam.</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-800">{t.product.name}</span>
                  <span className="text-[10px] text-gray-400 font-bold">
                    {new Date(t.createdAt).toLocaleString("id-ID", { 
                      dateStyle: "medium", 
                      timeStyle: "short" 
                    })}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-green-600">+{t.totalPrice.toLocaleString("id-ID")}</p>
                  <p className="text-[10px] font-bold text-gray-400">{t.quantity} Pcs</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigasi Bawah (Copy dari page.tsx tapi sesuaikan aktifnya) */}
    </div>
  );
}