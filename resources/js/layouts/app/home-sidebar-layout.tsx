import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { ChevronDown, X } from 'lucide-react';
import { createContext, Fragment, ReactNode, useContext } from 'react';

export const SidebarContext = createContext({});

export const UseSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const menus = [
        {
            label: 'Tentang Kami',
            href: '/about',
        },
        {
            label: 'Program',
            href: '#',
            children: [
                {
                    label: 'Pendidikan',
                    href: '#',
                },
                {
                    label: 'Pemberdayaan',
                    href: '#',
                },
                {
                    label: 'Sosial',
                    href: '#',
                },
            ],
        },
        {
            label: 'Berita',
            href: '/berita',
        },
        {
            label: 'Sponsorship',
            href: '#',
        },
        {
            label: 'Kontak',
            href: '#',
        },
    ];

    const contextValue = {
        menus,
    };

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};

export const NavigationComponent = () => {
    const { menus }: any = UseSidebar();

    return (
        <nav className="hidden items-center gap-1 lg:flex">
            {menus.map((menu: any, index: number) => (
                <div key={index} className="group relative">
                    <a
                        href={menu.href}
                        className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                        {menu.label}

                        {menu.children && <ChevronDown size={16} />}
                    </a>

                    {/* Dropdown */}
                    {menu.children && (
                        <div className="pointer-events-none absolute top-full left-0 mt-3 min-w-56 translate-y-3 rounded-2xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                            {menu.children.map(
                                (child: any, childIndex: number) => (
                                    <a
                                        key={childIndex}
                                        href={child.href}
                                        className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                                    >
                                        {child.label}
                                    </a>
                                ),
                            )}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};

type NavigationSidebarComponentProps = {
    open: boolean;
    onClose: () => void;
};

export const NavigationSidebarComponent = ({
    open,
    onClose,
}: NavigationSidebarComponentProps) => {
    const { menus }: any = UseSidebar();
    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-60 lg:hidden"
                onClose={onClose}
            >
                {/* Overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </TransitionChild>

                {/* Sidebar */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition duration-200"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-sm">
                                    <div className="flex h-full flex-col overflow-y-auto bg-slate-950 shadow-2xl">
                                        {/* Header */}
                                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                                            <div>
                                                <h2 className="text-xl font-black text-white">
                                                    Empower.
                                                </h2>

                                                <p className="text-sm text-white/60">
                                                    Innovation & Empowerment
                                                </p>
                                            </div>

                                            <button
                                                onClick={onClose}
                                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {/* Menu */}
                                        <div className="flex-1 space-y-3 p-6">
                                            {menus.map(
                                                (menu: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="overflow-hidden rounded-2xl border border-white/5 bg-white/3"
                                                    >
                                                        {menu.children ? (
                                                            <Disclosure>
                                                                {({ open }) => (
                                                                    <>
                                                                        <DisclosureButton className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-white transition hover:bg-white/5">
                                                                            <span>
                                                                                {
                                                                                    menu.label
                                                                                }
                                                                            </span>

                                                                            <ChevronDown
                                                                                size={
                                                                                    18
                                                                                }
                                                                                className={`transition ${
                                                                                    open
                                                                                        ? 'rotate-180'
                                                                                        : ''
                                                                                }`}
                                                                            />
                                                                        </DisclosureButton>

                                                                        <DisclosurePanel className="border-t border-white/5">
                                                                            {menu.children.map(
                                                                                (
                                                                                    child: any,
                                                                                    childIndex: number,
                                                                                ) => (
                                                                                    <a
                                                                                        key={
                                                                                            childIndex
                                                                                        }
                                                                                        href={
                                                                                            child.href
                                                                                        }
                                                                                        className="block px-6 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                                                                                    >
                                                                                        {
                                                                                            child.label
                                                                                        }
                                                                                    </a>
                                                                                ),
                                                                            )}
                                                                        </DisclosurePanel>
                                                                    </>
                                                                )}
                                                            </Disclosure>
                                                        ) : (
                                                            <a
                                                                href={menu.href}
                                                                className="block px-4 py-4 text-sm font-medium text-white transition hover:bg-white/5"
                                                            >
                                                                {menu.label}
                                                            </a>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        {/* Footer CTA */}
                                        <div className="border-t border-white/10 p-6">
                                            <div className="grid gap-3">
                                                <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white transition hover:bg-white/10">
                                                    Login
                                                </button>

                                                <button className="rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-90">
                                                    Donasi Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
