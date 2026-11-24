<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Admin Navigation Menu
    |--------------------------------------------------------------------------
    |
    | Struktur menu navigasi sidebar untuk Admin & Facilitator portal.
    | Icon dipetakan ke nama Lucide icon di frontend.
    | Route name dievaluasi menjadi URL menggunakan route($item['route']).
    |
    */

    'navigation' => [
        [
            'title' => 'Platform',
            'roles' => ['Administrators'],
            'children' => [
                [
                    'title' => 'System Core',
                    'roles' => ['Administrators'],
                    'icon' => 'CpuIcon',
                    'children' => [
                        [
                            'title' => 'Permissions',
                            'route' => 'admin.permissions.index',
                            'permission' => 'view-permission',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Roles',
                            'route' => 'admin.roles.index',
                            'permission' => 'view-role',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Users',
                            'route' => 'admin.users.index',
                            'permission' => 'view-user',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Regions',
                            'roles' => ['Administrators'],
                            'icon' => 'MapIcon',
                            'children' => [
                                [
                                    'title' => 'Provinces',
                                    'route' => 'admin.provinces.index',
                                    'permission' => 'view-province',
                                    'icon' => 'ChevronRight',
                                ],
                                [
                                    'title' => 'Regencies',
                                    'route' => 'admin.regencies.index',
                                    'permission' => 'view-regency',
                                    'icon' => 'ChevronRight',
                                ],
                                [
                                    'title' => 'Districts',
                                    'route' => 'admin.districts.index',
                                    'permission' => 'view-district',
                                    'icon' => 'ChevronRight',
                                ],
                                [
                                    'title' => 'Villages',
                                    'route' => 'admin.villages.index',
                                    'permission' => 'view-village',
                                    'icon' => 'ChevronRight',
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    'title' => 'Settings',
                    'roles' => ['Administrators'],
                    'icon' => 'CogIcon',
                    'children' => [
                        [
                            'title' => 'Site',
                            'route' => 'admin.site.edit',
                            'permission' => 'view-settings-site',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Log Activity',
                            'route' => 'admin.activities.index',
                            'permission' => 'view-log-activity',
                            'icon' => 'ChevronRight',
                        ],
                    ],
                ],
            ],
        ],
        [
            'title' => 'Company Profile',
            'roles' => ['Administrators', 'Editors'],
            'children' => [
                [
                    'title' => 'Master Data',
                    'roles' => ['Administrators', 'Editors'],
                    'icon' => 'DatabaseIcon',
                    'children' => [
                        [
                            'title' => 'Categories',
                            'route' => 'admin.categories.index',
                            'permission' => 'view-category',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Programs',
                            'route' => 'admin.programs.index',
                            'permission' => 'view-program',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Locations',
                            'route' => 'admin.locations.index',
                            'permission' => 'view-location',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Products',
                            'route' => 'admin.products.index',
                            'permission' => 'view-product',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Sliders',
                            'route' => 'admin.sliders.index',
                            'permission' => 'view-slider',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Mitra',
                            'route' => 'admin.mitras.index',
                            'permission' => 'view-mitra',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Gallery',
                            'route' => 'admin.galleries.index',
                            'permission' => 'view-gallery',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Reviews',
                            'route' => 'admin.reviews.index',
                            'permission' => 'view-review',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Testimonials',
                            'route' => 'admin.testimonials.index',
                            'permission' => 'view-testimonial',
                            'icon' => 'ChevronRight',
                        ],
                    ],
                ],
            ],
        ],
        [
            'title' => 'Pemberdayaan',
            'roles' => ['Administrators', 'Editors'],
            'children' => [
                [
                    'title' => 'Master Data',
                    'roles' => ['Administrators', 'Editors'],
                    'icon' => 'DatabaseIcon',
                    'children' => [
                        [
                            'title' => 'Fasilitator',
                            'route' => 'admin.fasilitators.index',
                            'permission' => 'view-fasilitator',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Kelompok Binaan',
                            'route' => 'admin.groups.index',
                            'permission' => 'view-group',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Penerima Manfaat',
                            'route' => 'admin.beneficiaries.index',
                            'permission' => 'view-beneficiary',
                            'icon' => 'ChevronRight',
                        ],
                    ],
                ],
                [
                    'title' => 'Transactions',
                    'roles' => ['Administrators', 'Editors'],
                    'icon' => 'ShoppingCart',
                    'children' => [
                        [
                            'title' => 'Laporan Aktivitas',
                            'route' => 'admin.activity-reports.index',
                            'permission' => 'view-activity-report',
                            'icon' => 'ChevronRight',
                        ],
                        [
                            'title' => 'Laporan Kas',
                            'route' => 'admin.cash-transactions.index',
                            'permission' => 'view-cash-transaction',
                            'icon' => 'ChevronRight',
                        ],
                    ],
                ],
                [
                    'title' => 'Reports',
                    'roles' => ['Administrators', 'Editors'],
                    'icon' => 'PrintIcon',
                    'children' => [
                        [
                            'title' => 'Report Data Pemberdayaan',
                            'route' => 'admin.reports.index',
                            'permission' => 'view-activity-report',
                            'icon' => 'ChevronRight',
                        ],
                    ],
                ],
            ],
        ],
    ],
];
