import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function TambahBarang() {
  async function tambahAksi(formData: FormData) {
    "use server";
    
    const nama = formData.get("nama") as string;
    const harga = Number(formData.get("harga"));

    // Ambil satu Warung yang ada di database agar tidak error relasi
    // Kalau database benar-benar kosong, kita harus buat User & Warung dulu
    let warung = await prisma.warung.findFirst();

    if (!warung) {
      // Jika belum ada warung sama sekali, kita buatkan satu dummy untuk test
      const user = await prisma.user.create({
        data: {
          nama: "Admin Test",
          email: "admin@test.com",
          password: "123", // Harusnya di-hash kalau sudah produksi
          warung: {
            create: {
              nama: "Warung Contoh"
            }
          }
        },
        include: { warung: true }
      });
      warung = user.warung;
    }

    // Masukkan data ke database
    await prisma.product.create({
      data: {
        name: nama,
        priceBuy: harga * 0.8,
        priceSell: harga,
        stock: 10,
        minStock: 2,
        // Slug dihapus karena tidak ada di schema.prisma Bli
        warungId: warung!.id, 
      }
    });

    redirect("/");
  }

  return (
    <div className="p-8 font-sans">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Tambah Barang Test</h1>
      <form action={tambahAksi} className="flex flex-col gap-4 max-w-sm">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Nama Barang</label>
          <input name="nama" placeholder="Contoh: Kopi Bubuk" className="border p-2.5 rounded-xl outline-blue-600" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Harga Jual (Rp)</label>
          <input name="harga" type="number" placeholder="Contoh: 5000" className="border p-2.5 rounded-xl outline-blue-600" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors">
          Simpan ke Supabase
        </button>
      </form>
    </div>
  );
}