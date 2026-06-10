import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function ProgramPage() {
    const { programs, categories } = usePage<any>().props;

    console.log(programs, categories);

    return (
        <Fragment>
            <section className="bg-slate-950 py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                        Program Pemberdayaan
                    </span>
                    <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-tight font-black md:text-6xl">
                        Jelajahi Program yang Membangun Kemandirian
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        Temukan program berdasarkan kategori, kebutuhan
                        kolaborasi, dan dampak pemberdayaan yang ingin dibangun.
                    </p>
                </div>
            </section>

            {/* <section className="bg-slate-50 py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 md:grid-cols-[1fr_260px]">
                    <InputTextComponent
                        type="search"
                        name="search"
                        placeholder="Cari Program"
                        addonLeft={SearchIcon}
                        group={true}
                        handleOnChange={(value: string) => {
                            setFilterValue({ ...filterValue, search: value });
                        }}
                    />
                    <SelectComponent
                        name="category"
                        placeholder="Semua Kategori"
                        data={categories?.map((item: any) => ({
                            value: item.slug,
                            label: `${item.name} (${item.programs_count || 0})`,
                        }))}
                        handleOnChange={(value: string) => {
                            setFilterValue({ ...filterValue, category: value });
                        }}
                    />
                </div>
            </section> */}

            {/* <section className="py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {data?.map((item: any, i: number) => (
                            <ProgramItemSection key={i} item={item} />
                        ))}
                    </div>

                    {items.length === 0 && (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                            <p className="text-lg font-bold text-slate-900">
                                Program tidak ditemukan
                            </p>
                            <p className="mt-2 text-slate-600">
                                Coba ubah kata kunci atau kategori pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </section> */}
        </Fragment>
    );
}

export const ProgramItemSection = ({ item }: { item: any }) => {
    return <div>ProgramItemSection</div>;
};
