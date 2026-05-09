import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function TambahBarang() {
  async function tambahAksi(formData: FormData) {
    "use server";
    
    try {
      const nama = formData.get("nama") as string;
      const harga = Number(formData.get("harga"));
      const stokAwal = Number(formData.get("stok")) || 0;

      // 1. Cari Warung yang sudah ada
      let warung = await prisma.warung.findFirst();

      // 2. Jika belum ada (Database baru), buat User & Warung secara otomatis
      if (!warung) {
        const userBaru = await prisma.user.create({
          data: {
            nama: "Owner Roadside",
            email: `owner-${Date.now()}@roadsidestock.com`,
            password: "password123", // Sementara, nanti diganti saat buat fitur Register
            warung: {
              create: {
                nama: "Warung Utama UMKM",
                alamat: "Tabanan, Bali"
              }
            }
          },
          include: { warung: true }
        });
        
        if (!userBaru.warung) throw new Error("Gagal menginisialisasi Warung");
        warung = userBaru.warung;
      }

      // 3. Simpan Produk ke Database (Cocok dengan Schema Bli)
      await prisma.product.create({
        data: {
          name: nama,
          stock: stokAwal,
          minStock: 2, // Batas minimum stok untuk peringatan
          priceBuy: harga * 0.8, // Estimasi harga beli (bisa diubah nanti)
          priceSell: harga,
          warungId: warung.id, // Relasi ke Warung
        }
      });

      // 4. Update cache halaman utama agar barang baru langsung muncul
      revalidatePath("/");
      
    } catch (error) {
      console.error("Detail Error:", error);
      // Opsional: Bli bisa redirect ke halaman error atau tampilkan pesan
      throw new Error("Gagal menyimpan data ke Supabase.");
    }

    // 5. Kembali ke Beranda
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tambah Stok</h1>
        <p className="text-gray-500 mb-8 text-sm">Masukkan detail barang dagangan baru Bli.</p>
        
        <form action={tambahAksi} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Nama Barang</label>
            <input 
              name="nama" 
              type="text"
              placeholder="Contoh: Kopi Bubuk Bali" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Harga Jual (Rp)</label>
            <input 
              name="harga" 
              type="number"
              placeholder="15000" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Stok Awal</label>
            <input 
              name="stok" 
              type="number"
              placeholder="10" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required 
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => redirect("/")}
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