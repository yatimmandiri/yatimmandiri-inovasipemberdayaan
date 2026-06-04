import { Card } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate';
import { usePage } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

export default function DetailPage() {
    const { video } = usePage<any>().props;

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
                            <span className="text-sm font-semibold">Title</span>
                            <span className="text-sm">{video.title}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Category
                            </span>
                            <span className="text-sm">
                                {video.category || '-'}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                YouTube URL
                            </span>
                            <a
                                href={video.youtube_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-orange-600 hover:underline"
                            >
                                {video.youtube_url}
                            </a>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                YouTube ID
                            </span>
                            <span className="text-sm">
                                {video.youtube_id || '-'}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Published At
                            </span>
                            <span className="text-sm">
                                {video.published_at
                                    ? formatDate(video.published_at)
                                    : '-'}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Status
                            </span>
                            <span className="text-sm">
                                {video.status ? 'Active' : 'Inactive'}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2 md:col-span-2">
                            <span className="text-sm font-semibold">
                                Description
                            </span>
                            <span className="text-sm whitespace-pre-line">
                                {video.description || '-'}
                            </span>
                        </li>
                        {video.youtube_id && (
                            <li className="flex flex-col space-y-2 md:col-span-2">
                                <span className="text-sm font-semibold">
                                    Preview
                                </span>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.youtube_id}`}
                                    title={video.title}
                                    className="aspect-video w-full rounded-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </li>
                        )}
                        {video.thumbnail_url && (
                            <li className="flex flex-col space-y-2 md:col-span-2">
                                <span className="text-sm font-semibold">
                                    Thumbnail
                                </span>
                                <img
                                    src={video.thumbnail_url}
                                    alt={video.title}
                                    className="h-64 w-full rounded-lg object-cover"
                                />
                            </li>
                        )}
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Created At
                            </span>
                            <span className="text-sm">
                                {formatDate(video.created_at)}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Updated At
                            </span>
                            <span className="text-sm">
                                {formatDate(video.updated_at)}
                            </span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
