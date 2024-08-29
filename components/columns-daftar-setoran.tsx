"use client";

import { DaftarSetoran } from "@/lib/data/setoran";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DaftarSetoran>[] = [
  {
    accessorKey: "IdentitasWajibPajak",
    header: "Identetitas",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.NamaWajibPajak}</p>
          <p className="text-xs text-muted-foreground">{row.original.NPWPD}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "JenisPajak",
    header: "JenisPajak",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.JenisPajak}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.RincianJenisPajak === row.original.JenisPajak
              ? null
              : row.original.RincianJenisPajak}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "AlamatLengkap",
    header: "AlamatLengkap",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.Kecamatan}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.AlamatBadan}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "MasaPajak",
    header: "Masa Pajak",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.MasaAwal.toLocaleDateString()}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.MasaAkhir.toLocaleDateString() ===
            row.original.TanggalBayar?.toLocaleDateString()
              ? null
              : row.original.MasaAkhir.toLocaleDateString()}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "TanggalBayar",
    header: "Tanggal Bayar",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.TanggalBayar?.toLocaleDateString()}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "Verifikasi",
    header: "Verifikasi",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.Verifikasi}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "Pokok",
    header: () => <div className="text-right">Pokok</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <p>
            {row.original.Pokok?.toLocaleString("id-ID", {
              style: "decimal",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Denda",
    header: () => <div className="text-right">Denda</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <p>
            {row.original.Denda?.toLocaleString("id-ID", {
              style: "decimal",
            })}
          </p>
        </div>
      );
    },
  },
];
