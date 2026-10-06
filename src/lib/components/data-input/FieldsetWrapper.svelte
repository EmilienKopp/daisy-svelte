<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils.js';

	interface Props {
		title?: string;
		description?: string;
		/** Render without border and padding, for nesting inside another container. */
		detached?: boolean;
		children?: Snippet;
		class?: string;
		[key: string]: any;
	}

	let {
		title = '',
		description = '',
		detached = false,
		children,
		class: className = '',
		...rest
	}: Props = $props();
</script>

<fieldset
	{...rest}
	class={cn(
		'fieldset bg-base-100 border-base-300 rounded-lg border p-6',
		detached && 'border-none p-1',
		className
	)}
>
	{#if title}
		<legend class="fieldset-legend text-primary font-semibold md:text-lg">
			{title}
		</legend>
	{/if}
	{#if description}
		<p class="mt-1 text-xs opacity-70 sm:text-sm">{description}</p>
	{/if}
	<div class="mt-4">
		{@render children?.()}
	</div>
</fieldset>
