import permissions from '@/routes/admin/core/permissions';
import districts from '@/routes/admin/core/regions/districts';
import provinces from '@/routes/admin/core/regions/provinces';
import regencies from '@/routes/admin/core/regions/regencies';
import villages from '@/routes/admin/core/regions/villages';
import roles from '@/routes/admin/core/roles';
import users from '@/routes/admin/core/users';
import news from '@/routes/admin/news';
import activities from '@/routes/admin/logs/activities';
import programCategories from '@/routes/admin/program-categories';
import programs from '@/routes/admin/programs';
import site from '@/routes/admin/settings/site';
import sponsorshipInquiries from '@/routes/admin/sponsorship-inquiries';
import testimonials from '@/routes/admin/testimonials';
import {
    ChevronRight,
    CogIcon,
    CpuIcon,
    DatabaseIcon,
    MapIcon,
} from 'lucide-react';

export const NavigationList = [
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
        title: 'Inovasi Pemberdayaan',
        roles: ['Administrators'],
        children: [
            {
                title: 'Content',
                roles: ['Administrators'],
                icon: DatabaseIcon,
                children: [
                    {
                        title: 'Program Category',
                        href: programCategories.index().url,
                        permission: 'view-program-category',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Program',
                        href: programs.index().url,
                        permission: 'view-program',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Testimonial',
                        href: testimonials.index().url,
                        permission: 'view-testimonial',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Berita',
                        href: news.index().url,
                        permission: 'view-news',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Video',
                        href: '/admin/videos',
                        permission: 'view-video',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Sponsorship',
                        href: sponsorshipInquiries.index().url,
                        permission: 'view-sponsorship-inquiry',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
];
