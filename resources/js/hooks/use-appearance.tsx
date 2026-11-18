import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = 'light' | 'dark' | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
const currentAppearance: Appearance = 'light';

const applyTheme = (): void => {
    if (typeof document === 'undefined') {
        return;
    }

    // Always lock to light mode across all pages
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem('appearance', 'light');
        document.cookie = `appearance=light;path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    } catch {
        // ignore storage errors
    }

    applyTheme();
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'light',
    );

    const resolvedAppearance: ResolvedAppearance = 'light';

    const updateAppearance = (_mode: Appearance): void => {
        applyTheme();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
