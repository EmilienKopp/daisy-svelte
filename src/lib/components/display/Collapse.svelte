<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils.js';

	interface Props {
		/** Plain-text title (ignored when the header snippet is given) */
		title?: string;
		/** Custom header content */
		header?: Snippet;
		/** Collapsible body content */
		children?: Snippet;
		/** Open state (bindable) */
		open?: boolean;
		/** Indicator icon */
		icon?: 'arrow' | 'plus' | 'none';
		class?: string;
	}

	let {
		title = '',
		header,
		children,
		open = $bindable(false),
		icon = 'arrow',
		class: className = ''
	}: Props = $props();
</script>

<div
	class={cn(
		'collapse border border-base-300 bg-base-100',
		icon === 'arrow' && 'collapse-arrow',
		icon === 'plus' && 'collapse-plus',
		className
	)}
>
	<input type="checkbox" bind:checked={open} />
	<div class="collapse-title text-sm font-semibold">
		{#if header}
			{@render header()}
		{:else}
			{title}
		{/if}
	</div>
	<div class="collapse-content">
		{@render children?.()}
	</div>
</div>
