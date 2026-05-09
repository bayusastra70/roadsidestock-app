"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function hapusBarangAksi(id: string) {
  try {
    await prisma.product.delete({
      where: { id: id },
    });
    
    // Memaksa halaman utama untuk mengambil data terbaru dari Supabase
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal menghapus barang:", error);
    throw new Error("Gagal menghapus data");
  }
}