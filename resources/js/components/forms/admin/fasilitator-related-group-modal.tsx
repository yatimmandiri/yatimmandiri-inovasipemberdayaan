import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import districtsRoute from '@/routes/admin/core/regions/districts';
import regenciesRoute from '@/routes/admin/core/regions/regencies';
import villagesRoute from '@/routes/admin/core/regions/villages';
import groups from '@/routes/admin/groups';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2Icon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GroupModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    fasilitator: any;
    programs: any[];
    provinces: any[];
    kantors: any[];
    onSuccess?: () => void;
}

export function FasilitatorGroupModal({
    open,
    onOpenChange,
    fasilitator,
    programs,
    provinces,
    kantors,
    onSuccess,
}: GroupModalProps) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        name: '',
        fasilitator_id: fasilitator?.id ? String(fasilitator.id) : '',
        kantor_id: fasilitator?.kantor_id ? String(fasilitator.kantor_id) : '',
        kantor_name: fasilitator?.kantor_name || '',
        program_id: '',
        leader_name: '',
        phone: '',
        address: '',
        province_id: fasilitator?.province_id || '',
        regency_id: fasilitator?.regency_id || '',
        district_id: fasilitator?.district_id || '',
        village_id: fasilitator?.village_id || '',
        description: '',
    });

    const [regencies, setRegencies] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    useEffect(() => {
        if (open && fasilitator) {
            setData((prev) => ({
                ...prev,
                fasilitator_id: String(fasilitator.id),
                kantor_id: fasilitator.kantor_id ? String(fasilitator.kantor_id) : '',
                kantor_name: fasilitator.kantor_name || '',
                province_id: fasilitator.province_id || '',
                regency_id: fasilitator.regency_id || '',
                district_id: fasilitator.district_id || '',
                village_id: fasilitator.village_id || '',
            }));
        }
    }, [open, fasilitator]);

    useEffect(() => {
        if (data.province_id) {
            axios
                .get(regenciesRoute.data().url, {
                    params: { filterValue: { province_id: data.province_id } },
                })
                .then((res) => {
                    const rows = Array.isArray(res.data) ? res.data : res.data?.data || [];
                    setRegencies(rows);
                })
                .catch(() => setRegencies([]));
        } else {
            setRegencies([]);
        }
    }, [data.province_id]);

    useEffect(() => {
        if (data.regency_id) {
            axios
                .get(districtsRoute.data().url, {
                    params: { filterValue: { regency_id: data.regency_id } },
                })
                .then((res) => {
                    const rows = Array.isArray(res.data) ? res.data : res.data?.data || [];
                    setDistricts(rows);
                })
                .catch(() => setDistricts([]));
        } else {
            setDistricts([]);
        }
    }, [data.regency_id]);

    useEffect(() => {
        if (data.district_id) {
            axios
                .get(villagesRoute.data().url, {
                    params: { filterValue: { district_id: data.district_id } },
                })
                .then((res) => {
                    const rows = Array.isArray(res.data) ? res.data : res.data?.data || [];
                    setVillages(rows);
                })
                .catch(() => setVillages([]));
        } else {
            setVillages([]);
        }
    }, [data.district_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((raw: any) => ({
            ...raw,
            fasilitator_id: fasilitator?.id,
            kantor_id: raw.kantor_id ? parseInt(raw.kantor_id, 10) : null,
            kantor_name: raw.kantor_name || null,
            program_id: raw.program_id ? parseInt(raw.program_id, 10) : null,
            province_id: raw.province_id || null,
            regency_id: raw.regency_id || null,
            district_id: raw.district_id || null,
            village_id: raw.village_id || null,
            status: true,
        }));

        post(groups.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onOpenChange(false);
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UsersIcon className="h-5 w-5 text-primary" />
                        Tambah Kelompok Binaan
                    </DialogTitle>
                    <DialogDescription>
                        Tambahkan kelompok baru yang dibina oleh{' '}
                        <strong className="text-foreground">{fasilitator?.name}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="group-name">
                            Nama Kelompok <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="group-name"
                            placeholder="Contoh: KUBE Mandiri Sejahtera"
                            value={data.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setData('name', e.target.value)
                            }
                            required
                        />
                        {errors.name && (
                            <p className="text-xs text-destructive">{errors.name}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="group-program">Program Pemberdayaan</Label>
                            <Select
                                value={data.program_id ? String(data.program_id) : undefined}
                                onValueChange={(val) => setData('program_id', val)}
                            >
                                <SelectTrigger id="group-program">
                                    <SelectValue placeholder="Pilih Program" />
                                </SelectTrigger>
                                <SelectContent>
                                    {programs?.map((p: any) => (
                                        <SelectItem key={p.id} value={String(p.id)}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.program_id && (
                                <p className="text-xs text-destructive">{errors.program_id}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="group-kantor">Kantor / Cabang</Label>
                            <Select
                                value={data.kantor_id ? String(data.kantor_id) : undefined}
                                onValueChange={(val) => {
                                    const selected = kantors?.find(
                                        (k: any) => String(k.id) === val,
                                    );
                                    setData((prev) => ({
                                        ...prev,
                                        kantor_id: val,
                                        kantor_name: selected?.nama || selected?.name || prev.kantor_name,
                                    }));
                                }}
                            >
                                <SelectTrigger id="group-kantor">
                                    <SelectValue placeholder="Pilih Cabang" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kantors?.map((k: any) => (
                                        <SelectItem key={k.id} value={String(k.id)}>
                                            {k.nama || k.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="group-leader">Nama Ketua Kelompok</Label>
                            <Input
                                id="group-leader"
                                placeholder="Nama ketua"
                                value={data.leader_name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData('leader_name', e.target.value)
                                }
                            />
                            {errors.leader_name && (
                                <p className="text-xs text-destructive">{errors.leader_name}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="group-phone">No. HP / WA</Label>
                            <Input
                                id="group-phone"
                                placeholder="08xxxxxxxxxx"
                                value={data.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData('phone', e.target.value)
                                }
                            />
                            {errors.phone && (
                                <p className="text-xs text-destructive">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="group-address">Alamat</Label>
                        <Input
                            id="group-address"
                            placeholder="Alamat domisili kelompok"
                            value={data.address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setData('address', e.target.value)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label>Provinsi</Label>
                            <Select
                                value={data.province_id || undefined}
                                onValueChange={(val) => {
                                    setData((prev) => ({
                                        ...prev,
                                        province_id: val,
                                        regency_id: '',
                                        district_id: '',
                                        village_id: '',
                                    }));
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Provinsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces?.map((p: any) => (
                                        <SelectItem key={p.id} value={String(p.id)}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Kabupaten / Kota</Label>
                            <Select
                                value={data.regency_id || undefined}
                                onValueChange={(val) => {
                                    setData((prev) => ({
                                        ...prev,
                                        regency_id: val,
                                        district_id: '',
                                        village_id: '',
                                    }));
                                }}
                                disabled={!data.province_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Kab/Kota" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regencies?.map((r: any) => (
                                        <SelectItem key={r.id} value={String(r.id)}>
                                            {r.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label>Kecamatan</Label>
                            <Select
                                value={data.district_id || undefined}
                                onValueChange={(val) => {
                                    setData((prev) => ({
                                        ...prev,
                                        district_id: val,
                                        village_id: '',
                                    }));
                                }}
                                disabled={!data.regency_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Kecamatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districts?.map((d: any) => (
                                        <SelectItem key={d.id} value={String(d.id)}>
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Kelurahan / Desa</Label>
                            <Select
                                value={data.village_id || undefined}
                                onValueChange={(val) => setData('village_id', val)}
                                disabled={!data.district_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Desa" />
                                </SelectTrigger>
                                <SelectContent>
                                    {villages?.map((v: any) => (
                                        <SelectItem key={v.id} value={String(v.id)}>
                                            {v.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="group-desc">Keterangan / Deskripsi</Label>
                        <Textarea
                            id="group-desc"
                            rows={2}
                            placeholder="Keterangan tambahan tentang kelompok"
                            value={data.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && (
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Simpan Kelompok
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}