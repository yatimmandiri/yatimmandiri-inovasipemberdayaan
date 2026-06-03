import { Menu } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import {
    NavigationComponent,
    NavigationSidebarComponent,
} from './home-sidebar-layout';

export const HomeHeaderComponent = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Fragment>
            <header
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
                    isScrolled
                        ? 'border-b border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl'
                        : 'bg-transparent'
                }`}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary font-black text-white shadow-lg">
                            E
                        </div>

                        <div className="text-white">
                            <h1 className="text-lg font-black">Growth YM</h1>

                            <p className="text-xs text-white/60">
                                Inovasi & Pemberdayaan
                            </p>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <NavigationComponent />

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 lg:hidden"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <NavigationSidebarComponent
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </Fragment>
    );
};
