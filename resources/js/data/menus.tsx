import categories from '@/routes/admin/companies/categories';
import mitras from '@/routes/admin/companies/mitras';
import programs from '@/routes/admin/companies/programs';
import sliders from '@/routes/admin/companies/sliders';
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
                ],
            },
        ],
    },
];
