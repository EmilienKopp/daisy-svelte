<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils.js';

	interface Props {
		title: string;
		description?: string;
		variant?: 'default' | 'small';
		class?: string;
		/** Extra content rendered next to the title (e.g. actions) */
		children?: Snippet;
	}

	let {
		title,
		description = '',
		variant = 'default',
		class: className = '',
		children
	}: Props = $props();
</script>

<header class={cn(variant === 'default' && 'mb-8 space-y-0.5', className)}>
	<div class="flex items-center justify-between gap-2">
		<h2
			class={variant === 'small'
				? 'mb-0.5 text-base font-medium'
				: 'text-xl font-semibold tracking-tight'}
		>
			{title}
		</h2>
		{@render children?.()}
	</div>
	{#if description}
		<p class="text-sm text-base-content/70">{description}</p>
	{/if}
</header>
