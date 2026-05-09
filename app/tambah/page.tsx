import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // Tambahkan ini agar halaman utama langsung terupdate

export default function TambahBarang() {
  async function tambahAksi(formData: FormData) {
    "use server";
    
    try {
      const nama = formData.get("nama") as string;
      const harga = Number(formData.get("harga"));

      // 1. Cari atau buat Warung secara otomatis
      let warung = await prisma.warung.findFirst();

      if (!warung) {
        // Buat user dan warung sekaligus dengan cara yang lebih aman
        const newUser = await prisma.user.create({
          data: {
            nama: "Owner Roadside",
            email: `owner-${Date.now()}@test.com`, // Email unik agar tidak error duplicate
            password: "pongo-safety-password",
            warung: {
              create: { nama: "Warung Utama" }
            }
          },
          include: { warung: true }
        });
        
        // Cek apakah warung berhasil dibuat
        if (!newUser.warung) throw new Error("Gagal membuat warung");
        warung = newUser.warung;
      }

      // 2. Masukkan data produk
      await prisma.product.create({
        data: {
          name: nama,
          priceBuy: harga * 0.8,
          priceSell: harga,
          stock: 10,
          minStock: 2,
          warungId: warung.id, 
        }
      });

      // 3. Bersihkan cache agar data baru langsung muncul di "/"
      revalidatePath("/");
      
    } catch (error) {
      console.error("Gagal simpan data:", error);
      // Jika error, kita tidak redirect tapi biarkan user tahu
      return; 
    }

    // 4. Redirect hanya jika sukses
    redirect("/");
  }

  // ... sisa kode return JSX Bli sudah bagus ...
}