"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Import cookies

export async function tambahAksi(formData: FormData) {
  // 1. Ambil warungId dari cookie (Proteksi data)
  const cookieStore = await cookies();
  const warungId = cookieStore.get("warungId")?.value;

  if (!warungId) {
    throw new Error("Sesi habis, silakan login lagi Bli.");
  }

  const name = formData.get("nama") as string;
  const priceSell = Number(formData.get("harga"));
  const stock = Number(formData.get("stok")) || 0;
  const category = formData.get("category") as string;
  const minStock = Number(formData.get("minStock")) || 5; // Tambahkan minStock biar warning-nya jalan

  // 2. Simpan barang sesuai warungId yang sedang login
  await prisma.product.create({
    data: {
      name,
      stock,
      priceSell,
      priceBuy: priceSell * 0.8, // Otomatisasi modal 80% dari harga jual
      category,
      minStock,
      warungId: warungId, // PAKAI ID DARI COOKIE
    }
  });

  revalidatePath("/");
  redirect("/");
}

export async function editBarangAksi(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const stock = parseInt(formData.get("stock") as string);
  const priceSell = parseInt(formData.get("priceSell") as string);
  const category = formData.get("category") as string;

  await prisma.product.update({
    where: { id },
    data: { name, stock, priceSell, category },
  });

  revalidatePath("/");
  redirect("/");
}

export async function jualAksi(formData: FormData) {
  const productId = formData.get("productId") as string;
  const qty = Number(formData.get("qty"));

  // 1. Cari produknya dulu
  const product = await prisma.product.findUnique({ 
    where: { id: productId } 
  });
  
  // 2. Validasi stok
  if (!product || product.stock < qty) {
    // Karena ini dipanggil langsung dari form action, kita tidak bisa return error ke state
    // Tapi kita bisa cegah prosesnya
    return;
  }

  // 3. Jalankan Transaksi
  await prisma.$transaction([
    // Kurangi stok produk
    prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: qty } }
    }),
    // Catat riwayat penjualan
    prisma.transaction.create({
      data: {
        productId,
        quantity: qty,
        totalPrice: product.priceSell * qty
      }
    })
  ]);

  // 4. Segarkan data Dashboard
  revalidatePath("/");
}