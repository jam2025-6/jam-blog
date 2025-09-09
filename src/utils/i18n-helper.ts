import i18n from '@/i18n';

export function translate(key: string, args?: Record<string, unknown>): string {
    // args 可选，默认空对象
    return (i18n.global as any).t(key, args || {}) as unknown as string;
}
