import categories from '@/routes/admin/companies/categories';
import galleries from '@/routes/admin/companies/galleries';
import locations from '@/routes/admin/companies/locations';
import mitras from '@/routes/admin/companies/mitras';
import products from '@/routes/admin/companies/products';
import programs from '@/routes/admin/companies/programs';
import reviews from '@/routes/admin/companies/reviews';
import sliders from '@/routes/admin/companies/sliders';
import testimonials from '@/routes/admin/companies/testimonials';
import visitReports from '@/routes/admin/visit-reports';
import branches from '@/routes/admin/branches';
import groups from '@/routes/admin/groups';
import kas from '@/routes/admin/kas';
import { dashboard as adminDashboard } from '@/routes/admin';
import fasilitatorPortal from '@/routes/fasilitator';
import fasilitatorKas from '@/routes/fasilitator/kas';
import fasilitatorGroup from '@/routes/fasilitator/group';
import fasilitatorVisitReports from '@/routes/fasilitator/visit-reports';
import permissions from '@/routes/admin/core/permissions';
import districts from '@/routes/admin/core/regions/districts';
import provinces from '@/routes/admin/core/regions/provinces';
import regencies from '@/routes/admin/core/regions/regencies';
import villages from '@/routes/admin/core/regions/villages';
import roles from '@/routes/admin/core/roles';
import users from '@/routes/admin/core/users';
import activities from '@/routes/admin/logs/activities';
import site from '@/routes/admin/settings/site';
import {
    ChevronRight,
    ClipboardListIcon,
    CogIcon,
    CpuIcon,
    DatabaseIcon,
    LayoutDashboardIcon,
    MapIcon,
    WalletIcon,
    UsersIcon,
    Building2Icon,
} from 'lucide-react';

/**
 * Satu sumber kebenaran menu untuk SEMUA role (pola omatiq).
 *
 * - Item tanpa akses (roles/permission tidak cocok) DIBUANG oleh nav-main —
 *   menu bukan pengaman: setiap route tetap authorize di server.
 * - `hrefByRole`: href berbeda per role untuk item yang dipakai admin DAN
 *   fasilitator (prefix /admin/... vs /fasilitator/...). nav-main memilih
 *   href sesuai role user, jadi klik item yang tampil tidak akan 403.
 */
export const NavigationList = [
    {
        title: 'Beranda',
        children: [
            {
                title: 'Dashboard',
                hrefByRole: {
                    Administrators: adminDashboard().url,
                    Editors: adminDashboard().url,
                    Fasilitator: fasilitatorPortal.dashboard().url,
                },
                icon: LayoutDashboardIcon,
            },
        ],
    },
    {
        title: 'Platform',
        roles: ['Administrators'],
        children: [
            {
                title: 'System Core',
                roles: ['Administrators'],
                icon: CpuIcon,
                children: [
                    {
                        title: 'Permissions',
                        href: permissions.index().url,
                        permission: 'view-permission',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Roles',
                        href: roles.index().url,
                        permission: 'view-role',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Users',
                        href: users.index().url,
                        permission: 'view-user',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Regions',
                        roles: ['Administrators'],
                        icon: MapIcon,
                        children: [
                            {
                                title: 'Provinces',
                                href: provinces.index().url,
                                permission: 'view-province',
                                icon: ChevronRight,
                            },
                            {
                                title: 'Regencies',
                                href: regencies.index().url,
                                permission: 'view-regency',
                                icon: ChevronRight,
                            },
                            {
                                title: 'Districts',
                                href: districts.index().url,
                                permission: 'view-district',
                                icon: ChevronRight,
                            },
                            {
                                title: 'Villages',
                                href: villages.index().url,
                                permission: 'view-village',
                                icon: ChevronRight,
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Settings',
                roles: ['Administrators'],
                icon: CogIcon,
                children: [
                    {
                        title: 'Site',
                        href: site.edit().url,
                        permission: 'view-settings-site',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Log Activity',
                        href: activities.index().url,
                        permission: 'view-log-activity',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
    {
        title: 'Company Profile',
        roles: ['Administrators', 'Editors'],
        children: [
            {
                title: 'Master Data',
                roles: ['Administrators', 'Editors'],
                icon: DatabaseIcon,
                children: [
                    {
                        title: 'Categories',
                        href: categories.index().url,
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Programs',
                        href: programs.index().url,
                        permission: 'view-program',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Locations',
                        href: locations.index().url,
                        permission: 'view-location',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Products',
                        href: products.index().url,
                        permission: 'view-product',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Sliders',
                        href: sliders.index().url,
                        permission: 'view-slider',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Mitra',
                        href: mitras.index().url,
                        permission: 'view-mitra',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Gallery',
                        href: galleries.index().url,
                        permission: 'view-gallery',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Reviews',
                        href: reviews.index().url,
                        permission: 'view-review',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Testimonials',
                        href: testimonials.index().url,
                        permission: 'view-testimonial',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
    {
        title: 'Monitoring Evaluasi',
        children: [
            {
                title: 'Monitoring Evaluasi',
                hrefByRole: {
                    Administrators: visitReports.index().url,
                    Editors: visitReports.index().url,
                    Fasilitator: fasilitatorVisitReports.index().url,
                },
                permission: 'view-visit-report',
                icon: ClipboardListIcon,
            },
        ],
    },
    {
        title: 'Kas & Kelompok',
        children: [
            {
                title: 'Cabang',
                href: branches.index().url,
                roles: ['Administrators', 'Editors'],
                icon: Building2Icon,
            },
            {
                title: 'Kelompok Fasilitator',
                hrefByRole: {
                    Administrators: groups.index().url,
                    Editors: groups.index().url,
                    Fasilitator: fasilitatorGroup.my().url,
                },
                permission: 'view-group',
                icon: UsersIcon,
            },
            {
                title: 'Pencatatan Kas',
                hrefByRole: {
                    Administrators: kas.index().url,
                    Editors: kas.index().url,
                    Fasilitator: fasilitatorKas.index().url,
                },
                permission: 'view-cash-transaction',
                icon: WalletIcon,
            },
        ],
    },
];
