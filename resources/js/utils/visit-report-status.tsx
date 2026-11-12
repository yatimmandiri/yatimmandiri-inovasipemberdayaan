import { Badge } from '@/components/ui/badge';

/**
 * Badge status laporan pendampingan:
 * draft -> submitted -> (admin) reviewed  atau  revised -> (edit + submit ulang)
 */
const STATUS_BADGES: Record<string, { label: string; className: string }> = {
    draft: {
        label: 'Draft',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    submitted: {
        label: 'Menunggu Review',
        className: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    revised: {
        label: 'Perlu Revisi',
        className: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    reviewed: {
        label: 'Disetujui',
        className: 'bg-green-100 text-green-800 border-green-200',
    },
};

export const renderStatusBadge = (status: string) => {
    const badge = STATUS_BADGES[status];

    if (!badge) {
        return (
            <Badge variant="outline" className="uppercase">
                {status}
            </Badge>
        );
    }

    return (
        <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${badge.className}`}
        >
            {badge.label}
        </span>
    );
};

/** Status yang masih boleh diedit/diajukan fasilitator (dipakai policy juga). */
export const isEditableStatus = (status: string) =>
    status === 'draft' || status === 'revised';
