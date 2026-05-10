"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function registerAksi(prevState: any, formData: FormData) {
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const namaWarung = formData.get("namaWarung") as string;

  try {
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) return { error: "Email ini sudah dipakai, Bli!" };

    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password,
        warung: { create: { nama: namaWarung, alamat: "Tabanan" } }
      },
      include: { warung: true }
    });

    const cookieStore = await cookies();
    cookieStore.set("warungId", user.warung?.id || "", { 
      maxAge: 60 * 60 * 24 * 30, // 30 Hari
      path: '/' 
    });
    
    return { success: true };
  } catch (e) {
    return { error: "Terjadi kesalahan sistem." };
  }
}

export async function loginAksi(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { warung: true }
    });

    if (!user || user.password !== password) {
      return { error: "Email atau Password salah, cek lagi Bli!" };
    }

    const cookieStore = await cookies();
    cookieStore.set("warungId", user.warung?.id || "", { 
      maxAge: 60 * 60 * 24 * 30, // 30 Hari
      path: '/' 
    });

    return { success: true };
  } catch (e) {
    return { error: "Gagal masuk. Coba beberapa saat lagi." };
  }
}

export async function logoutAksi() {
  const cookieStore = await cookies();
  cookieStore.delete("warungId");
  // Setelah hapus cookie, user otomatis tertendang ke login karena middleware/page check
  return { success: true };
}

export async function getProfileData() {
  const cookieStore = await cookies();
  const warungId = cookieStore.get("warungId")?.value;

  if (!warungId) return null;

  return await prisma.warung.findUnique({
    where: { id: warungId },
    include: {
      user: {
        select: { nama: true, email: true }
      }
    }
  });
}