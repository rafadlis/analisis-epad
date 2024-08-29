import { columns } from "@/components/columns-daftar-setoran";
import { DataTable } from "@/components/utils/data-table";
import { getDaftarSetoran } from "@/lib/data/setoran";

export default async function DaftarSetoranPage() {
  const data = await getDaftarSetoran();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
