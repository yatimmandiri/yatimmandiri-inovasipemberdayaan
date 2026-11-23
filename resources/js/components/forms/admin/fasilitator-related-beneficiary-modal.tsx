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
import beneficiaries from '@/routes/admin/beneficiaries';
import districtsRoute from '@/routes/admin/core/regions/districts';
import regenciesRoute from '@/routes/admin/core/regions/regencies';
import villagesRoute from '@/routes/admin/core/regions/villages';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { HeartHandshakeIcon, Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BeneficiaryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    fasilitator: any;
    programs: any[];
    groups: any[];
    provinces: any[];
    kantors: any[];
    onSuccess?: () => void;
}

export function FasilitatorBeneficiaryModal({
    open,
    onOpenChange,
    fasilitator,
    programs,
    groups,
    provinces,
    kantors,
    onSuccess,
}: BeneficiaryModalProps) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        name: '',
        nik: '',
        fasilitator_id: fasilitator?.id ? String(fasilitator.id) : '',
        group_id: '',
        kantor_id: fasilitator?.kantor_id ? String(fasilitator.kantor_id) : '',
        kantor_name: fasilitator?.kantor_name || '',
        program_ids: [] as number[],
        phone: '',
        address: '',
        province_id: fasilitator?.province_id || '',
        regency_id: fasilitator?.regency_id || '',
        district_id: fasilitator?.district_id || '',
        village_id: fasilitator?.village_id || '',
        notes: '',
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

    const toggleProgram = (id: number) => {
        setData((prev) => {
            const exists = prev.program_ids.includes(id);
            return {
                ...prev,
                program_ids: exists
                    ? prev.program_ids.filter((p) => p !== id)
                    : [...prev.program_ids, id],
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((raw: any) => ({
            ...raw,
            fasilitator_id: fasilitator?.id,
            group_id: raw.group_id ? parseInt(raw.group_id, 10) : null,
            kantor_id: raw.kantor_id ? parseInt(raw.kantor_id, 10) : null,
            kantor_name: raw.kantor_name || null,
            province_id: raw.province_id || null,
            regency_id: raw.regency_id || null,
            district_id: raw.district_id || null,
            village_id: raw.village_id || null,
            status: true,
        }));

        post(beneficiaries.store().url, {
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
                        <HeartHandshakeIcon className="h-5 w-5 text-primary" />
                        Tambah Penerima Manfaat
                    </DialogTitle>
                    <DialogDescription>
                        Tambahkan penerima manfaat binaan untuk{' '}
                        <strong className="text-foreground">{fasilitator?.name}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="pm-name">
                                Nama Lengkap <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="pm-name"
                                placeholder="Nama penerima manfaat"
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

                        <div className="space-y-1.5">
                            <Label htmlFor="pm-nik">NIK (No. KTP)</Label>
                            <Input
                                id="pm-nik"
                                placeholder="16 digit NIK"
                                value={data.nik}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData('nik', e.target.value)
                                }
                            />
                            {errors.nik && (
                                <p className="text-xs text-destructive">{errors.nik}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="pm-group">Kelompok</Label>
                            <Select
                                value={data.group_id ? String(data.group_id) : undefined}
                                onValueChange={(val) => setData('group_id', val)}
                            >
                                <SelectTrigger id="pm-group">
                                    <SelectValue placeholder="Pilih Kelompok (opsional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {groups?.map((g: any) => (
                                        <SelectItem key={g.id} value={String(g.id)}>
                                            {g.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="pm-phone">No. HP / WA</Label>
                            <Input
                                id="pm-phone"
                                placeholder="08xxxxxxxxxx"
                                value={data.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData('phone', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Program Pemberdayaan Diikuti</Label>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {programs?.map((p: any) => {
                                const selected = data.program_ids.includes(p.id);
                                return (
                                    <button
                                        type="button"
                                        key={p.id}
                                        onClick={() => toggleProgram(p.id)}
                                        className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                                            selected
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-background hover:bg-muted text-foreground border-input'
                                        }`}
                                    >
                                        {p.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="pm-address">Alamat</Label>
                        <Input
                            id="pm-address"
                            placeholder="Alamat domisili penerima manfaat"
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
                        <Label htmlFor="pm-notes">Catatan / Keterangan</Label>
                        <Textarea
                            id="pm-notes"
                            rows={2}
                            placeholder="Catatan kondisi penerima manfaat"
                            value={data.notes}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setData('notes', e.target.value)
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
                            Simpan Penerima Manfaat
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}