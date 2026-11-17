import { ButtonComponent } from '@/components/partials/button-component';
import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
import { InputTextComponent } from '@/components/partials/input-component';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import branches from '@/routes/admin/branches';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    FileUpIcon,
    MoreHorizontal,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function ListPage() {
    const { errors }: any = usePage<any>().props;

    const [refreshData, setRefreshData] = useState(false);
    const [filterValue] = useState<object>({});

    // Form tambah/edit cabang (dialog) + baris yang akan dihapus.
    const [formrow, setFormrow] = useState<any>(null);
    const [formNew, setFormNew] = useState(false);
    const [formName, setFormName] = useState('');
    const [formLabel, setFormLabel] = useState('');
    const [deleterow, setDeleterow] = useState<any>(null);
    const [importOpen, setImportOpen] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);
    const formOpen = formNew || formrow !== null;

    const openCreate = () => {
        setFormrow(null);
        setFormNew(true);
        setFormName('');
        setFormLabel('');
    };

    const openEdit = (row: any) => {
        setFormNew(false);
        setFormrow(row);
        setFormName(row.name);
        setFormLabel(row.label || '');
    };

    const handleSave = (e: any) => {
        e.preventDefault();

        if (formrow) {
            router.put(
                branches.update(formrow.id).url,
                {
                    name: formName,
                    label: formLabel,
                },
                {
                    onSuccess: () => {
                        setFormrow(null);
                        setFormNew(false);
                        setRefreshData(true);
                    },
                },
            );
        } else {
            router.post(
                branches.store().url,
                {
                    name: formName,
                    label: formLabel,
                },
                {
                    onSuccess: () => {
                        setFormrow(null);
                        setFormNew(false);
                        setRefreshData(true);
                    },
                },
            );
        }
    };

    const handleDelete = () => {
        if (!deleterow) {
            return;
        }

        router.delete(branches.destroy(deleterow.id).url, {
            onSuccess: () => {
                setDeleterow(null);
                setRefreshData(true);
            },
        });
    };

    const handleImport = (e: any) => {
        e.preventDefault();

        if (!importFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', importFile);

        router.post(branches.import().url, formData, {
            forceFormData: true,
            onSuccess: () => {
                setImportOpen(false);
                setImportFile(null);
                setRefreshData(true);
            },
        });
    };

    const columns = [
        {
            id: 'actions',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                const data = info.row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEdit(data)}>
                                <PencilIcon className="h-3 w-3" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDeleterow(data)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'ID'),
            accessorKey: 'id',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Nama Cabang'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Label Tampilan'),
            accessorKey: 'label',
            cell: (info: any) => info.getValue() || '—',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jumlah Kelompok'),
            accessorKey: 'groups_count',
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            ID: item.id,
            'Nama Cabang': item.name,
            'Label Tampilan': item.label || '',
            'Jumlah Kelompok': item.groups_count,
        }));
    };

    return (
        <>
            <Head title="Cabang" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <Button
                        className="inline-flex items-center gap-2"
                        onClick={openCreate}
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Cabang
                    </Button>
                    <Button
                        variant="outline"
                        className="inline-flex items-center gap-2"
                        onClick={() => setImportOpen(true)}
                    >
                        <FileUpIcon className="h-4 w-4" />
                        Import JSON
                    </Button>
                </div>

                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTableProvider
                        columns={columns}
                        filterValue={filterValue}
                        refreshData={refreshData}
                        setRefreshData={setRefreshData}
                        urlFetchData={branches.data().url}
                        formatDataExport={formatDataExport}
                    >
                        <DataTableComponent buttonActive={{ export: false }} />
                    </DataTableProvider>
                </div>

                {/* Dialog tambah/edit cabang */}
                <Dialog
                    open={formOpen}
                    onOpenChange={(open) =>
                        open ? null : setFormrow(null) || setFormNew(false)
                    }
                >
                    <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
                    <DialogContent>
                        <DialogTitle className="text-xl font-semibold">
                            {formrow ? 'Edit Cabang' : 'Tambah Cabang'}
                        </DialogTitle>
                        <DialogDescription>
                            {formrow
                                ? 'Ubah data cabang. ID tidak berubah agar referensi stabil.'
                                : 'Cabang baru akan mendapat ID otomatis.'}
                        </DialogDescription>
                        <form
                            onSubmit={handleSave}
                            className="mt-2 flex flex-col space-y-4"
                        >
                            <InputTextComponent
                                type="text"
                                label="Nama Cabang"
                                name="name"
                                placeholder="Contoh: SURABAYA"
                                value={formName}
                                handleOnChange={(value: string) =>
                                    setFormName(value)
                                }
                                errors={errors.name && errors.name}
                                helperText={errors.name && errors.name}
                                color={errors.name && 'danger'}
                            />
                            <InputTextComponent
                                type="text"
                                label="Label Tampilan (opsional)"
                                name="label"
                                placeholder="Kosongkan bila tampil = nama cabang"
                                value={formLabel}
                                handleOnChange={(value: string) =>
                                    setFormLabel(value)
                                }
                                errors={errors.label && errors.label}
                                helperText={
                                    errors.label
                                        ? errors.label
                                        : 'Misal: PUSAT 2 tampil sebagai SURABAYA.'
                                }
                            />
                            <div className="flex justify-end space-x-4">
                                <ButtonComponent
                                    buttonText="Batal"
                                    buttonType="button"
                                    onClick={() => {
                                        setFormrow(null);
                                        setFormNew(false);
                                    }}
                                />
                                <ButtonComponent
                                    buttonText="Save"
                                    buttonType="submit"
                                />
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Dialog konfirmasi hapus */}
                <Dialog
                    open={!!deleterow}
                    onOpenChange={(open) => (open ? null : setDeleterow(null))}
                >
                    <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
                    <DialogContent>
                        <DialogTitle className="text-xl font-semibold">
                            Hapus Cabang
                        </DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus cabang ini? Cabang yang masih
                            dipakai kelompok/kas tidak dapat dihapus.
                        </DialogDescription>
                        <div className="mt-4 flex justify-end space-x-4">
                            <ButtonComponent
                                buttonText="Batal"
                                buttonType="button"
                                onClick={() => setDeleterow(null)}
                            />
                            <ButtonComponent
                                buttonText="Delete"
                                addonLeft={TrashIcon}
                                buttonType="button"
                                onClick={handleDelete}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Dialog import JSON */}
                <Dialog
                    open={importOpen}
                    onOpenChange={(open) =>
                        open ? null : setImportOpen(false)
                    }
                >
                    <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
                    <DialogContent>
                        <DialogTitle className="text-xl font-semibold">
                            Import Cabang dari JSON
                        </DialogTitle>
                        <DialogDescription>
                            Format: array {'{'}id, name, label?{'}'} seperti
                            branch-offices.json. ID dari JSON dipertahankan;
                            baris yang ada akan diperbarui (bulk update).
                        </DialogDescription>
                        <form
                            onSubmit={handleImport}
                            className="mt-2 flex flex-col space-y-4"
                        >
                            <input
                                type="file"
                                accept=".json,application/json"
                                onChange={(e) =>
                                    setImportFile(e.target.files?.[0] ?? null)
                                }
                            />
                            <div className="flex justify-end space-x-4">
                                <ButtonComponent
                                    buttonText="Batal"
                                    buttonType="button"
                                    onClick={() => setImportOpen(false)}
                                />
                                <ButtonComponent
                                    buttonText="Import"
                                    addonLeft={FileUpIcon}
                                    buttonType="submit"
                                />
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
