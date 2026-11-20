import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import fasilitators from '@/routes/admin/fasilitators';
import { formatDate } from '@/utils/formatDate';
import { router, useForm } from '@inertiajs/react';
import {
    BadgeCheckIcon,
    BadgeXIcon,
    KeyRoundIcon,
    Loader2Icon,
    MoreHorizontalIcon,
    PencilIcon,
    Trash2Icon,
    UserCheckIcon,
    UserPlusIcon,
} from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState({});

    // Dialog User
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [selectedFasilitator, setSelectedFasilitator] = useState<any>(null);

    // Dialog Delete
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [fasilitatorToDelete, setFasilitatorToDelete] = useState<any>(null);

    const userForm = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleOpenCreateUser = (fasilitator: any) => {
        setSelectedFasilitator(fasilitator);
        userForm.setData({
            email: fasilitator.email || '',
            password: '',
            password_confirmation: '',
        });
        userForm.clearErrors();
        setUserModalOpen(true);
    };

    const handleCreateUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFasilitator) return;

        userForm.post(fasilitators.createUser(selectedFasilitator.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setUserModalOpen(false);
                setRefreshData(true);
                userForm.reset();
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(fasilitators.destroy(id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModalOpen(false);
                setRefreshData(true);
            },
        });
    };

    const renderRowStatus = (info: any) => {
        const handleStatus = (id: number) => {
            router.put(
                fasilitators.status(id).url,
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setRefreshData(true);
                        router.reload({ only: ['flash'] });
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

    const renderActions = (info: any) => {
        const item = info.row.original;
        const hasUser = !!item.user_id || !!item.user;

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() =>
                            router.visit(fasilitators.show(item.id).url)
                        }
                    >
                        Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            router.visit(fasilitators.edit(item.id).url)
                        }
                    >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {hasUser ? (
                        <DropdownMenuItem disabled className="text-emerald-600 dark:text-emerald-400">
                            <UserCheckIcon className="mr-2 h-4 w-4" />
                            User Terdaftar
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            onClick={() => handleOpenCreateUser(item)}
                            className="text-primary font-medium focus:text-primary"
                        >
                            <UserPlusIcon className="mr-2 h-4 w-4" />
                            Buat Akun User
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => {
                            setFasilitatorToDelete(item);
                            setDeleteModalOpen(true);
                        }}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Nama Fasilitator'),
            accessorKey: 'name',
            cell: (info: any) => {
                const item = info.row.original;
                return (
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-foreground">{item.name}</span>
                        {item.user ? (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                                <KeyRoundIcon className="h-3 w-3" />
                                {item.user.email}
                            </span>
                        ) : (
                            <span className="text-xs text-muted-foreground italic">
                                Belum ada user login
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kantor / Cabang'),
            accessorKey: 'kantor_name',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Program Pemberdayaan'),
            accessorKey: 'programs',
            cell: (info: any) => {
                const programs = info.getValue() || [];
                if (programs.length === 0) return '-';
                return (
                    <div className="flex flex-wrap gap-1">
                        {programs.map((p: any) => (
                            <span
                                key={p.id}
                                className="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                            >
                                {p.name}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            header: (info: any) => renderRowHeader(info, 'No. HP / WA'),
            accessorKey: 'phone',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Email'),
            accessorKey: 'email',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jml PM'),
            accessorKey: 'beneficiaries_count',
            cell: (info: any) => (
                <span className="font-semibold text-primary">
                    {info.getValue() ?? 0} Orang
                </span>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Wilayah'),
            accessorKey: 'regency.name',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Status'),
            accessorKey: 'status',
            cell: (info: any) => renderRowStatus(info),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Created At'),
            accessorKey: 'created_at',
            cell: (info: any) => renderRowDate(info.getValue()),
        },
        {
            id: 'actions',
            header: () => <span className="px-2">Aksi</span>,
            cell: (info: any) => renderActions(info),
            enableSorting: false,
            enableHiding: false,
            size: 60,
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Nama: item.name,
            'User Login': item.user?.email || 'Belum Ada',
            Kantor: item.kantor_name || '-',
            Program: item.programs?.map((p: any) => p.name).join(', ') || '-',
            'No. HP': item.phone || '-',
            Email: item.email || '-',
            'Jml PM': item.beneficiaries_count || 0,
            Status: item.status ? 'Aktif' : 'Non-Aktif',
            'Created At': formatDate(item.created_at),
        }));
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <DataTableProvider
                    columns={columns}
                    filterValue={filterValue}
                    refreshData={refreshData}
                    setRefreshData={setRefreshData}
                    urlFetchData={fasilitators.data().url}
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

            {/* Modal Buat Akun User */}
            <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <UserPlusIcon className="h-5 w-5 text-primary" />
                            Buat Akun Login Fasilitator
                        </DialogTitle>
                        <DialogDescription>
                            Buat kredensial login portal untuk fasilitator{' '}
                            <strong className="text-foreground">
                                {selectedFasilitator?.name}
                            </strong>
                            . User akan otomatis diberikan role{' '}
                            <strong>Fasilitator</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateUserSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="user-email">Email Login</Label>
                            <Input
                                id="user-email"
                                type="email"
                                placeholder="email@contoh.com"
                                value={userForm.data.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    userForm.setData('email', e.target.value)
                                }
                                required
                            />
                            {userForm.errors.email && (
                                <p className="text-xs text-destructive">
                                    {userForm.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="user-password">Password</Label>
                            <Input
                                id="user-password"
                                type="password"
                                placeholder="Minimal 8 karakter"
                                value={userForm.data.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    userForm.setData('password', e.target.value)
                                }
                                required
                            />
                            {userForm.errors.password && (
                                <p className="text-xs text-destructive">
                                    {userForm.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="user-password-confirmation">
                                Konfirmasi Password
                            </Label>
                            <Input
                                id="user-password-confirmation"
                                type="password"
                                placeholder="Ulangi password"
                                value={userForm.data.password_confirmation}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    userForm.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            {userForm.errors.password_confirmation && (
                                <p className="text-xs text-destructive">
                                    {userForm.errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setUserModalOpen(false)}
                                disabled={userForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={userForm.processing}
                            >
                                {userForm.processing && (
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Buat Akun
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Konfirmasi Hapus */}
            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">
                            Hapus Fasilitator
                        </DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus fasilitator{' '}
                            <strong>{fasilitatorToDelete?.name}</strong>? Tindakan
                            ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                                fasilitatorToDelete &&
                                handleDelete(fasilitatorToDelete.id)
                            }
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
