import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3Icon,
    ChevronDown,
    ChevronRight,
    CogIcon,
    CpuIcon,
    DatabaseIcon,
    HeartHandshakeIcon,
    MapIcon,
    UsersIcon,
    UsersRoundIcon,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    CpuIcon,
    CogIcon,
    DatabaseIcon,
    MapIcon,
    UsersIcon,
    UsersRoundIcon,
    HeartHandshakeIcon,
    BarChart3Icon,
    ChevronRight,
};

const resolveIcon = (icon: any) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
        const Comp = ICON_MAP[icon] || ChevronRight;
        return <Comp className="mr-2 h-4 w-4" />;
    }
    const IconComp = icon;
    return <IconComp className="mr-2 h-4 w-4" />;
};

export const MainNav = ({ items }: any) => {
    const { auth, menus: serverMenus } = usePage<any>().props;
    const { currentUrl } = useCurrentUrl();

    // Prioritaskan menu dari server config/menu.php, fallback ke items
    const menuSource = (serverMenus && serverMenus.length > 0) ? serverMenus : items;

    const roles = auth?.user?.roles || [];
    const permissions = auth?.user?.permissions || [];

    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    const normalizePath = (path: string) => {
        if (!path) return '';
        const trimmed = path.trim().replace(/^\/+|\/+$/g, '');
        return trimmed ? '/' + trimmed : '/';
    };

    const currentPath = normalizePath(currentUrl);

    const getPathname = (href: string) => {
        if (!href || href === '#') return '';
        try {
            return normalizePath(
                new URL(href, window.location.origin).pathname,
            );
        } catch {
            return normalizePath(href);
        }
    };

    const isPathActive = (href: string) => {
        const itemPath = getPathname(href);
        if (!itemPath || itemPath === '/' || itemPath === '/admin') {
            return currentPath === itemPath;
        }
        return (
            currentPath === itemPath ||
            currentPath.startsWith(itemPath + '/')
        );
    };

    const hasPermission = (permission: string) =>
        permissions.includes(permission);

    const hasRole = (requiredRoles: string[]) =>
        requiredRoles.length === 0 ||
        requiredRoles.some((role) => roles.includes(role));

    const filterMenuByPermissions = (menus: any[]): any[] => {
        return (menus || [])
            .map((item) => {
                const requiredRoles: string[] = item.roles ?? [];

                if (requiredRoles.length > 0 && !hasRole(requiredRoles))
                    return null;
                if (item.permission && !hasPermission(item.permission))
                    return null;

                const filteredChildren = Array.isArray(item.children)
                    ? filterMenuByPermissions(item.children)
                    : [];

                if (!item.href && filteredChildren.length === 0) return null;

                return {
                    ...item,
                    children: filteredChildren,
                };
            })
            .filter(Boolean);
    };

    const filteredItems = useMemo(() => {
        return filterMenuByPermissions(menuSource);
    }, [menuSource, permissions, roles]);

    const getMenuKey = (item: any, parents: string[] = []) => {
        return [...parents, item.title].join(' > ');
    };

    const hasExactMatchingChild = (children: any[]): boolean => {
        return children?.some((child) => {
            if (child.href && isPathActive(child.href)) {
                return true;
            }
            return (
                child.children?.length > 0 &&
                hasExactMatchingChild(child.children)
            );
        });
    };

    const isDashboard =
        currentPath === '/admin' || currentPath === '/admin/dashboard';

    useEffect(() => {
        if (isDashboard) {
            setOpenMenus({});
            return;
        }

        const newOpenMenus: { [key: string]: boolean } = {};

        const traverse = (menus: any[], parents: string[] = []) => {
            menus.forEach((item) => {
                const isDirectMatch = item.href && isPathActive(item.href);
                const hasMatchingChild =
                    item.children && hasExactMatchingChild(item.children);

                if (isDirectMatch || hasMatchingChild) {
                    parents.forEach((key) => {
                        newOpenMenus[key] = true;
                    });
                    newOpenMenus[getMenuKey(item, parents)] = true;
                }

                if (item.children) {
                    traverse(item.children, [...parents, item.title]);
                }
            });
        };

        traverse(filteredItems);
        setOpenMenus(newOpenMenus);
    }, [currentPath, filteredItems]);

    const toggleMenu = (menuKey: string) => {
        setOpenMenus((prev: any) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    const renderMenuItems = (
        menuItems: any[],
        level = 0,
        parents: string[] = [],
    ) => {
        return menuItems.map((item) => {
            const itemPath = getPathname(item.href || '');
            const isActive = currentPath === itemPath;
            const hasChildren = !!item.children?.length;
            const menuKey = getMenuKey(item, parents);
            const isOpen = openMenus[menuKey] || false;

            return (
                <SidebarMenuItem
                    key={menuKey}
                    className={cn({
                        'pl-1': level === 1,
                        'pl-2': level === 2,
                        'pl-3': level >= 3,
                    })}
                >
                    <div className="flex w-full items-center justify-between">
                        <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={{ children: item.title }}
                            onClick={(e) => {
                                if (hasChildren) {
                                    e.preventDefault();
                                    toggleMenu(menuKey);
                                }
                            }}
                        >
                            <Link href={item.href || '#'} prefetch>
                                {resolveIcon(item.icon)}
                                <span className="flex-1 truncate text-left">
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>

                        {hasChildren && (
                            <button
                                onClick={() => toggleMenu(menuKey)}
                                className="focus:outline-none"
                            >
                                {isOpen ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>
                        )}
                    </div>

                    {hasChildren && isOpen && (
                        <SidebarMenu className="mt-1">
                            {renderMenuItems(item.children, level + 1, [
                                ...parents,
                                item.title,
                            ])}
                        </SidebarMenu>
                    )}
                </SidebarMenuItem>
            );
        });
    };

    return (
        <Fragment>
            {filteredItems.map((group) => (
                <SidebarGroup key={group.title} className="px-2">
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {renderMenuItems(group.children || [], 0, [
                            group.title,
                        ])}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </Fragment>
    );
};
