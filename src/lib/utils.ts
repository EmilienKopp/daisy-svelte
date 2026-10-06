export { cn } from './utils/cn.js';

/**
 * Normalize the various error prop shapes into a single message.
 * Supports `error` (plain string) and `errors` (string or string[]).
 */
export function normalizeError(
	error?: string | null,
	errors?: string | string[] | null
): string | null {
	if (error) return error;
	if (typeof errors === 'string') return errors;
	if (Array.isArray(errors)) return errors[0] ?? null;
	return null;
}

/** Resolve a dot-notation path (e.g. "user.profile.name") on an object. */
export function dot(obj: unknown, path: string): unknown {
	if (obj == null || !path) return undefined;
	return path
		.split('.')
		.reduce<unknown>(
			(acc, key) => (acc == null ? undefined : (acc as Record<string, unknown>)[key]),
			obj
		);
}

/** Turn a snake/kebab-cased key into a human readable label. */
export function readable(key: string): string {
	return key.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
