import { Card } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate';
import { usePage } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

export default function DetailPage() {
    const { program } = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <Card className="min-h-full p-4 md:p-6">
                    <div className="flex items-center space-x-2">
                        <InfoIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                            Detail Information
                        </span>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Name</span>
                            <span className="text-sm">{program.name}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Status
                            </span>
                            <span className="text-sm">
                                {program.status ? 'Active' : 'Inactive'}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2 md:col-span-2">
                            <span className="text-sm font-semibold">
                                Description
                            </span>
                            <span className="text-sm">
                                {program.description}
                            </span>
                        </li>
                        {program.featured_image && (
                            <li className="flex flex-col space-y-2 md:col-span-2">
                                <span className="text-sm font-semibold">
                                    Featured Image
                                </span>
                                <img
                                    src={`/storage/${program.featured_image}`}
                                    alt={program.name}
                                    className="h-64 w-full rounded-lg object-cover"
                                />
                            </li>
                        )}
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Created At
                            </span>
                            <span className="text-sm">
                                {formatDate(program.created_at)}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Updated At
                            </span>
                            <span className="text-sm">
                                {formatDate(program.updated_at)}
                            </span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
