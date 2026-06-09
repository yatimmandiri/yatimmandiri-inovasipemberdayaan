export const SkeletonBlogComponent = () => {
    return (
        <article className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-60 animate-pulse bg-slate-200" />

            <div className="space-y-4 p-6">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                <div className="space-y-2">
                    <div className="h-6 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
            </div>
        </article>
    );
};

export const SkeletonBeritaComponent = () => {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                    <div className="h-125 animate-pulse bg-slate-200" />

                    <div className="space-y-4 p-8">
                        <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />

                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {Array.from({ length: 4 }).map((item, i) => (
                    <div
                        key={i}
                        className="flex gap-4 rounded-2xl border bg-white p-3"
                    >
                        <div className="h-28 w-32 animate-pulse rounded-xl bg-slate-200" />

                        <div className="flex-1 space-y-3">
                            <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                            <div className="space-y-2">
                                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
