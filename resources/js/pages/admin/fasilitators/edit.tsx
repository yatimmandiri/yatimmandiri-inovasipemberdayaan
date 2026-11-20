import { FasilitatorBeneficiaryModal } from '@/components/forms/admin/fasilitator-related-beneficiary-modal';
import { FasilitatorGroupModal } from '@/components/forms/admin/fasilitator-related-group-modal';
import { FasilitatorForm } from '@/components/forms/admin/fasilitator-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import beneficiariesRoute from '@/routes/admin/beneficiaries';
import fasilitatorsRoute from '@/routes/admin/fasilitators';
import groupsRoute from '@/routes/admin/groups';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    ExternalLinkIcon,
    EyeIcon,
    HeartHandshakeIcon,
    PencilIcon,
    PlusIcon,
    UserCheckIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-react';
import { useState } from 'react';

export default function EditPage() {
    const { fasilitator, programs, provinces, kantors }: any = usePage<any>().props;

    const [activeTab, setActiveTab] = useState<'profile' | 'groups' | 'beneficiaries'>('profile');
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [beneficiaryModalOpen, setBeneficiaryModalOpen] = useState(false);

    const handleRefresh = () => {
        router.reload({ only: ['fasilitator'] });
    };

    const groupList = fasilitator?.groups || [];
    const beneficiaryList = fasilitator?.beneficiaries || [];

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            {/* Header / Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-sidebar-border/70 bg-card p-4 md:p-6 dark:border-sidebar-border">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">
                            Edit Fasilitator: {fasilitator?.name}
                        </h2>
                        {fasilitator?.kantor_name && (
                            <span className="inline-flex rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                {fasilitator.kantor_name}
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola data profil fasilitator, kelompok binaan, dan penerima manfaat didampingi.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link href={fasilitatorsRoute.index().url}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                            <ArrowLeftIcon className="h-4 w-4" /> Kembali
                        </Button>
                    </Link>
                    <Link href={fasilitatorsRoute.show(fasilitator?.id).url}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                            <EyeIcon className="h-4 w-4" /> Detail
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs Container */}
            <Tabs
                value={activeTab}
                onValueChange={(val: any) => setActiveTab(val)}
                className="w-full space-y-4"
            >
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span>Profil</span>
                    </TabsTrigger>
                    <TabsTrigger value="groups" className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" />
                        <span>Kelompok ({groupList.length})</span>
                    </TabsTrigger>
                    <TabsTrigger value="beneficiaries" className="flex items-center gap-2">
                        <HeartHandshakeIcon className="h-4 w-4" />
                        <span>Penerima Manfaat ({beneficiaryList.length})</span>
                    </TabsTrigger>
                </TabsList>

                {/* Tab Profil */}
                <TabsContent value="profile" className="space-y-4">
                    <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                        <FasilitatorForm dataId={fasilitator?.id} />
                    </div>
                </TabsContent>

                {/* Tab Kelompok */}
                <TabsContent value="groups" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <UsersIcon className="h-5 w-5 text-primary" />
                                    Kelompok Binaan
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Daftar kelompok yang didampingi oleh fasilitator ini.
                                </CardDescription>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => setGroupModalOpen(true)}
                                className="flex items-center gap-1.5"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Tambah Kelompok
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {groupList.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="rounded-full bg-muted p-3 text-muted-foreground mb-3">
                                        <UsersIcon className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">Belum Ada Kelompok</h4>
                                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                        Fasilitator ini belum memiliki kelompok binaan. Klik tombol "Tambah Kelompok" di atas untuk menambahkan.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {groupList.map((group: any) => (
                                        <div
                                            key={group.id}
                                            className="group flex flex-col justify-between rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {group.name}
                                                    </h4>
                                                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                                        {group.beneficiaries_count ?? 0} PM
                                                    </span>
                                                </div>

                                                {group.program?.name && (
                                                    <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                                                        {group.program.name}
                                                    </span>
                                                )}

                                                <div className="space-y-1 text-xs text-muted-foreground pt-1">
                                                    <p>Ketua: <strong className="text-foreground">{group.leader_name || '-'}</strong></p>
                                                    <p>Kontak: {group.phone || '-'}</p>
                                                    {group.address && <p className="truncate">Alamat: {group.address}</p>}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                                                <Link href={groupsRoute.edit(group.id).url}>
                                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                        <PencilIcon className="mr-1 h-3.5 w-3.5" /> Edit
                                                    </Button>
                                                </Link>
                                                <Link href={groupsRoute.show(group.id).url}>
                                                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                                        <ExternalLinkIcon className="mr-1 h-3.5 w-3.5" /> Buka
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab Penerima Manfaat */}
                <TabsContent value="beneficiaries" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <HeartHandshakeIcon className="h-5 w-5 text-primary" />
                                    Penerima Manfaat Didampingi
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Daftar penerima manfaat yang dibina oleh fasilitator ini.
                                </CardDescription>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => setBeneficiaryModalOpen(true)}
                                className="flex items-center gap-1.5"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Tambah PM
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {beneficiaryList.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="rounded-full bg-muted p-3 text-muted-foreground mb-3">
                                        <HeartHandshakeIcon className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">Belum Ada Penerima Manfaat</h4>
                                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                        Fasilitator ini belum memiliki penerima manfaat yang didampingi. Klik tombol "Tambah PM" di atas untuk menambahkan.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {beneficiaryList.map((pm: any) => (
                                        <div
                                            key={pm.id}
                                            className="group flex flex-col justify-between rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                            {pm.name}
                                                        </h4>
                                                        {pm.nik && (
                                                            <p className="font-mono text-xs text-muted-foreground">
                                                                NIK: {pm.nik}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {pm.group?.name && (
                                                        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                                                            {pm.group.name}
                                                        </span>
                                                    )}
                                                </div>

                                                {pm.programs && pm.programs.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {pm.programs.map((p: any) => (
                                                            <span
                                                                key={p.id}
                                                                className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                                                            >
                                                                {p.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="space-y-1 text-xs text-muted-foreground pt-1">
                                                    <p>Kontak: {pm.phone || '-'}</p>
                                                    {pm.address && <p className="truncate">Alamat: {pm.address}</p>}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                                                <Link href={beneficiariesRoute.edit(pm.id).url}>
                                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                        <PencilIcon className="mr-1 h-3.5 w-3.5" /> Edit
                                                    </Button>
                                                </Link>
                                                <Link href={beneficiariesRoute.show(pm.id).url}>
                                                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                                        <ExternalLinkIcon className="mr-1 h-3.5 w-3.5" /> Buka
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Modal Tambah Kelompok */}
            <FasilitatorGroupModal
                open={groupModalOpen}
                onOpenChange={setGroupModalOpen}
                fasilitator={fasilitator}
                programs={programs}
                provinces={provinces}
                kantors={kantors}
                onSuccess={handleRefresh}
            />

            {/* Modal Tambah Penerima Manfaat */}
            <FasilitatorBeneficiaryModal
                open={beneficiaryModalOpen}
                onOpenChange={setBeneficiaryModalOpen}
                fasilitator={fasilitator}
                programs={programs}
                groups={groupList}
                provinces={provinces}
                kantors={kantors}
                onSuccess={handleRefresh}
            />
        </div>
    );
}