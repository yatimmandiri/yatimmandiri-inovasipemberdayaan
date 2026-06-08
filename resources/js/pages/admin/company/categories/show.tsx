import { Card } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate';
import { usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { InfoIcon } from 'lucide-react';

export default function DetailPage() {
    const { category } = usePage<any>().props;

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
                            <span className="text-sm">{category.name}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Created At
                            </span>
                            <span className="text-sm">
                                {formatDate(category.created_at)}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Updated At
                            </span>
                            <span className="text-sm">
                                {formatDate(category.updated_at)}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Icon</span>
                            {category.icon ? (
                                <img
                                    src={`/storage/${category.icon}`}
                                    alt="img"
                                    className="h-auto w-16 rounded-full"
                                />
                            ) : (
                                <span className="text-sm">No Image</span>
                            )}
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Featured Image
                            </span>
                            {category.featured_image ? (
                                <img
                                    src={`/storage/${category.featured_image}`}
                                    alt="img"
                                    className="h-auto w-44 rounded-lg"
                                />
                            ) : (
                                <span className="text-sm">No Image</span>
                            )}
                        </li>
                    </ul>
                    <ul>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Description
                            </span>
                            <span>{parse(category.description)}</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
