import { DataTableComponent } from "@/components/partials/dataTables";
import { DataTableProvider } from "@/components/partials/dataTables/hooks/useDataTables";
import { SelectComponent } from "@/components/partials/select-component";
import {
  renderRowDate,
  renderRowHeader,
} from "@/components/partials/dataTables/utils/dataTable-utils";
import { Badge } from "@/components/ui/badge";
import groups from "@/routes/admin/groups";
import { formatDate } from "@/utils/formatDate";
import { router, usePage } from "@inertiajs/react";
import { BadgeCheckIcon, BadgeXIcon } from "lucide-react";
import { useState } from "react";

export default function ListPage() {
  const { kantors }: any = usePage<any>().props;
  const [refreshData, setRefreshData] = useState(false);
  const [filterValue, setFilterValue] = useState<any>({});

  const renderRowStatus = (info: any) => {
    const handleStatus = (id: number) => {
      router.put(
        groups.status(id).url,
        {},
        {
          preserveScroll: true,
          onSuccess: () => {
            setRefreshData(true);
            router.reload({ only: ["flash"] });
          },
        },
      );
    };

    return info.getValue() ? (
      <Badge
        className="cursor-pointer bg-blue-500 text-white dark:bg-blue-600"
        onClick={() => handleStatus(info.row.original.id)}
        variant="default"
      >
        <BadgeCheckIcon className="mr-1 h-3.5 w-3.5" />
        Active
      </Badge>
    ) : (
      <Badge
        className="cursor-pointer"
        onClick={() => handleStatus(info.row.original.id)}
        variant="destructive"
      >
        <BadgeXIcon className="mr-1 h-3.5 w-3.5" />
        Deactive
      </Badge>
    );
  };

  const columns = [
    {
      header: (info: any) => renderRowHeader(info, "Nama Kelompok"),
      accessorKey: "name",
    },
    {
      header: (info: any) => renderRowHeader(info, "Kantor / Cabang"),
      accessorKey: "kantor_name",
      cell: (info: any) => info.getValue() || "-",
    },
    {
      header: (info: any) => renderRowHeader(info, "Fasilitator"),
      accessorKey: "fasilitator.name",
      cell: (info: any) => info.getValue() || "-",
    },
    {
      header: (info: any) => renderRowHeader(info, "Program"),
      accessorKey: "program.name",
      cell: (info: any) => info.getValue() || "-",
    },
    {
      header: (info: any) => renderRowHeader(info, "Ketua Kelompok"),
      accessorKey: "leader_name",
      cell: (info: any) => info.getValue() || "-",
    },
    {
      header: (info: any) => renderRowHeader(info, "Anggota (PM)"),
      accessorKey: "beneficiaries_count",
      cell: (info: any) => (
        <span className="font-semibold text-primary">
          {info.getValue() ?? 0} Orang
        </span>
      ),
    },
    {
      header: (info: any) => renderRowHeader(info, "Wilayah"),
      accessorKey: "regency.name",
      cell: (info: any) => info.getValue() || "-",
    },
    {
      header: (info: any) => renderRowHeader(info, "Status"),
      accessorKey: "status",
      cell: (info: any) => renderRowStatus(info),
    },
    {
      header: (info: any) => renderRowHeader(info, "Created At"),
      accessorKey: "created_at",
      cell: (info: any) => renderRowDate(info.getValue()),
    },
  ];

  const formatDataExport = (data: any) => {
    return data.map((item: any, i: number) => ({
      No: i + 1,
      Nama: item.name,
      Kantor: item.kantor_name || "-",
      Fasilitator: item.fasilitator?.name || "-",
      Program: item.program?.name || "-",
      Ketua: item.leader_name || "-",
      "Jml Anggota": item.beneficiaries_count || 0,
      Status: item.status ? "Aktif" : "Non-Aktif",
      "Created At": formatDate(item.created_at),
    }));
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-72">
            <SelectComponent
              placeholder="Pilih Kantor Cabang..."
              value={filterValue?.kantor_id || ""}
              onChange={(val: any) => {
                setFilterValue((prev: any) => ({
                  ...prev,
                  kantor_id: val || undefined,
                }));
              }}
              data={(kantors || []).map((k: any) => ({
                value: k.id,
                label: k.name || k.nama,
              }))}
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <DataTableProvider
          columns={columns}
          filterValue={filterValue}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          urlFetchData={groups.data().url}
          formatDataExport={formatDataExport}
        >
          <DataTableComponent
            buttonActive={{
              create: true,
              export: true,
            }}
          />
        </DataTableProvider>
      </div>
    </div>
  );
}
