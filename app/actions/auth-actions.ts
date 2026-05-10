"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAksi(formData: FormData) {
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string; // Idealnya di-hash pakai bcrypt
  const namaWarung = formData.get("namaWarung") as string;

  const user = await prisma.user.create({
    data: {
      nama,
      email,
      password,
      warung: {
        create: {
          nama: namaWarung,
          alamat: "Tabanan", // Default
        }
      }
    },
    include: { warung: true }
  });

  const cookieStore = await cookies();
  cookieStore.set("warungId", user.warung?.id || "");
  
  redirect("/");
}

export async function loginAksi(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { warung: true }
  });

  if (!user || user.password !== password) {
    throw new Error("Email atau password salah");
  }

  const cookieStore = await cookies();
  cookieStore.set("warungId", user.warung?.id || "");

  redirect("/");
}

export async function logoutAksi() {
  const cookieStore = await cookies();
  cookieStore.delete("warungId");
  redirect("/login");
}