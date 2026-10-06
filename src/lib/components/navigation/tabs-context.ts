export interface TabsContext {
	group: string;
	variant: 'border' | 'box' | 'lift';
	contentClass?: string;
	register: (title: string) => void;
	unregister: (title: string) => void;
	isActive: (title: string) => boolean;
	select: (title: string) => void;
}

export const TABS_CONTEXT_KEY = Symbol('daisy-svelte-tabs');
