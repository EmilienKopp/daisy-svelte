<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import { cn } from '../../utils/cn.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './tabs-context.js';

	interface Props {
		/** Title of the currently active tab. Bindable. Defaults to the first tab. */
		activeTab?: string;
		/** daisyUI tab style. */
		variant?: 'border' | 'box' | 'lift';
		/** daisyUI tab size. */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Radio group name shared by the child tabs. Auto-generated when omitted. */
		group?: string;
		/** Extra classes applied to each tab's content panel. */
		contentClass?: string;
		/** Called whenever the active tab changes. */
		onTabChange?: (title: string) => void;
		class?: string;
		/** <Tab> children. */
		children?: Snippet;
	}

	const uid = $props.id();

	let {
		activeTab = $bindable(),
		variant = 'border',
		size = 'md',
		group = `tabs-${uid}`,
		contentClass,
		onTabChange,
		class: className,
		children
	}: Props = $props();

	const variantClass: Record<string, string> = {
		border: 'tabs-border',
		box: 'tabs-box',
		lift: 'tabs-lift'
	};

	const sizeClass: Record<string, string> = {
		xs: 'tabs-xs',
		sm: 'tabs-sm',
		md: 'tabs-md',
		lg: 'tabs-lg',
		xl: 'tabs-xl'
	};

	let titles: string[] = $state([]);

	function select(title: string) {
		if (activeTab === title) return;
		activeTab = title;
		onTabChange?.(title);
	}

	setContext<TabsContext>(TABS_CONTEXT_KEY, {
		get group() {
			return group;
		},
		get variant() {
			return variant;
		},
		get contentClass() {
			return contentClass;
		},
		register(title) {
			if (!titles.includes(title)) titles.push(title);
			if (activeTab === undefined) activeTab = title;
		},
		unregister(title) {
			titles = titles.filter((t) => t !== title);
		},
		isActive: (title) => activeTab === title,
		select
	});

	/** Select a tab by title. */
	export function selectTab(title: string) {
		select(title);
	}

	/** Titles of all registered tabs, in order. */
	export function getTabs(): string[] {
		return [...titles];
	}

	/** Move to the next tab, if any. */
	export function goNext() {
		const i = titles.indexOf(activeTab ?? '');
		if (i >= 0 && i < titles.length - 1) select(titles[i + 1]);
	}

	/** Move to the previous tab, if any. */
	export function goPrevious() {
		const i = titles.indexOf(activeTab ?? '');
		if (i > 0) select(titles[i - 1]);
	}
</script>

<div role="tablist" class={cn('tabs', variantClass[variant], sizeClass[size], className)}>
	{@render children?.()}
</div>
