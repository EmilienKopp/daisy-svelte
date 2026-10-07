export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
	/** Auto-dismiss delay in ms. 0 disables auto-dismiss. Default 4000. */
	duration?: number;
	/** Small secondary line shown under the message. */
	hint?: string;
	/** Extra classes applied to the alert element. */
	class?: string;
	/** Optional action button rendered after the message. */
	action?: { label: string; onclick: () => void };
}

export interface ToastItem {
	id: number;
	message: string;
	variant: ToastVariant;
	duration: number;
	hint?: string;
	class?: string;
	action?: { label: string; onclick: () => void };
}

const DEFAULT_DURATION = 4000;

class ToastStore {
	items = $state<ToastItem[]>([]);
	#nextId = 0;
	#timers = new Map<number, ReturnType<typeof setTimeout>>();

	/** Push a toast. Returns its id so it can be dismissed programmatically. */
	show(message: string, variant: ToastVariant = 'info', options: ToastOptions = {}): number {
		const id = ++this.#nextId;
		const duration = options.duration ?? DEFAULT_DURATION;

		this.items.push({
			id,
			message,
			variant,
			duration,
			hint: options.hint,
			class: options.class,
			action: options.action
		});

		if (duration > 0) {
			this.#timers.set(
				id,
				setTimeout(() => this.dismiss(id), duration)
			);
		}

		return id;
	}

	success(message: string, options?: ToastOptions): number {
		return this.show(message, 'success', options);
	}

	error(message: string, options?: ToastOptions): number {
		return this.show(message, 'error', options);
	}

	info(message: string, options?: ToastOptions): number {
		return this.show(message, 'info', options);
	}

	warning(message: string, options?: ToastOptions): number {
		return this.show(message, 'warning', options);
	}

	/**
	 * Show the first non-empty entry of a flash-style payload,
	 * e.g. { success: 'Saved!' } or { error: 'Nope' }.
	 */
	fromFlash(flash: Partial<Record<ToastVariant, string | null>>, options?: ToastOptions): void {
		const entry = Object.entries(flash).find(([, message]) => message && message.length > 0);
		if (!entry) return;
		this.show(entry[1] as string, entry[0] as ToastVariant, options);
	}

	dismiss(id: number): void {
		const timer = this.#timers.get(id);
		if (timer) {
			clearTimeout(timer);
			this.#timers.delete(id);
		}
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear(): void {
		for (const timer of this.#timers.values()) clearTimeout(timer);
		this.#timers.clear();
		this.items = [];
	}
}

/** Global toast store: call `toast.success('Saved!')` anywhere, render `<Toaster />` once. */
export const toast = new ToastStore();
