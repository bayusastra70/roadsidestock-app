"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function hapusBarangAksi(id: string) {
  try {
    // Kita ubah statusnya jadi arsip agar data transaksi di laporan tidak rusak
    await prisma.product.update({
      where: { id: id },
      data: { isArchived: true }
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Gagal mengarsipkan barang:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}