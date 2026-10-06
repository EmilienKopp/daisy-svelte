<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import { cn } from '../../utils/cn.js';
	import { TABS_CONTEXT_KEY, type TabsContext } from './tabs-context.js';

	interface Props {
		/** Tab label; also acts as its identity within the parent <Tabs>. */
		title: string;
		disabled?: boolean;
		/** Suffixes the label with "*" to flag the tab. */
		attentionNeeded?: boolean;
		/** Suffixes the label with a check mark. */
		completed?: boolean;
		/** Native title attribute on the tab. */
		tooltip?: string;
		/** Extra classes for this tab's content panel. */
		class?: string;
		/** Panel content. */
		children?: Snippet;
	}

	let {
		title,
		disabled = false,
		attentionNeeded = false,
		completed = false,
		tooltip,
		class: className,
		children
	}: Props = $props();

	const ctx = getContext<TabsContext | undefined>(TABS_CONTEXT_KEY);
	if (!ctx) {
		throw new Error('<Tab> must be used inside a <Tabs> component.');
	}

	$effect(() => {
		ctx.register(title);
		return () => ctx.unregister(title);
	});

	const displayTitle = $derived.by(() => {
		if (attentionNeeded) return `${title} *`;
		if (completed) return `${title} ✓`;
		return title;
	});

	const active = $derived(ctx.isActive(title));
</script>

<input
	type="radio"
	name={ctx.group}
	class={cn('tab', attentionNeeded && 'text-error')}
	aria-label={displayTitle}
	checked={active}
	{disabled}
	title={tooltip}
	onchange={() => ctx.select(title)}
/>
<div class={cn('tab-content border-base-300 bg-base-100 p-6', ctx.contentClass, className)}>
	{@render children?.()}
</div>
