"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

export interface DaftarSetoran {
  NamaWajibPajak: string;
  RincianJenisPajak: string;
  JenisPajak: string;
  NPWPD: string;
  Kecamatan: string;
  AlamatBadan: string;
  IDSubjek: number;
  MasaAwal: Date;
  MasaAkhir: Date;
  NoTanggalMasa: number;
  BulanMasaPajak: number;
  TahunMasaPajak: number;
  TanggalBayar: Date | null;
  TanggalDaftar: Date;
  TanggalHapus: Date | null;
  Pokok: number | null;
  Denda: number | null;
  Pembuat: string;
  NoTanggalBayar: number | null;
  TahunBayar: number | null;
  BulanBayar: number | null;
  Verifikasi: string | null;
}

export async function getDaftarSetoran(
  limit: number = 10
): Promise<DaftarSetoran[]> {
  const data = await db.$queryRaw<DaftarSetoran[]>`
      SELECT TOP (${limit})
      wp.NamaBadan AS NamaWajibPajak,
      wp.NamaJenisPendapatan AS RincianJenisPajak,
      wp.NamaJenisPendapatan AS JenisPajak,
      wp.ObyekBadanNo AS NPWPD,
      wp.Kecamatan AS Kecamatan,
      wp.AlamatBadan AS AlamatBadan,
      wp.ObyekBadanID AS IDSubjek,
      CAST(nk.MasaAwal AS DATE) AS MasaAwal,
      CAST(nk.MasaAkhir AS DATE) AS MasaAkhir,
      DAY(nk.MasaAwal) AS NoTanggalMasa,
      MONTH(nk.MasaAwal) AS BulanMasaPajak,
      Year(nk.MasaAwal) AS TahunMasaPajak,
      CAST(s.TglBayar AS DATE) AS TanggalBayar,
      CAST(wp.TglSah AS DATE) AS TanggalDaftar,
      CAST(wp.TglHapus AS DATE) AS TanggalHapus,
      CAST(s.JmlBayar AS BIGINT) AS Pokok,
      CAST(s.JmlBayarDenda AS BIGINT) AS Denda,
      nk.UserAdd AS Pembuat,
      CAST(DAY(s.TglBayar) AS INT) AS NoTanggalBayar,
      CAST(YEAR(s.TglBayar) AS INT) AS TahunBayar,
      CAST(MONTH(s.TglBayar) AS INT) AS BulanBayar,
      s.NTB AS Verifikasi
  FROM
      dbo.vw_skpd sk
  LEFT JOIN
      dbo.vw_obyekbadan wp ON 
      wp.ObyekBadanNo = sk.ObyekBadanNo AND
      wp.UsahaBadan = sk.UsahaBadan AND
      wp.NamaBadan = sk.NamaBadan AND
      wp.WPID = sk.WPID
  LEFT JOIN
      dbo.NomorKohir nk ON sk.KohirID = nk.KohirID
  LEFT JOIN
      dbo.SetoranHist s ON s.SubKohir = nk.KohirID
  WHERE
      s.TglBayar IS NOT NULL
  ORDER BY
      s.TglBayar DESC,
      s.NTB DESC
  `;
  revalidatePath("/");
  return data;
}
