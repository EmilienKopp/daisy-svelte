<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils.js';

	interface Props {
		/** Card title */
		title?: string;
		/** Optional subtitle under the title */
		subtitle?: string;
		class?: string;
		/** Card body content */
		children?: Snippet;
		/** Rendered in a daisyUI card-actions footer */
		actions?: Snippet;
	}

	let { title, subtitle, class: className = '', children, actions }: Props = $props();
</script>

<section class={cn('card card-border bg-base-100 shadow-md', className)}>
	<div class="card-body flex h-full flex-col justify-between">
		{#if title}
			<h2 class="card-title">{title}</h2>
		{/if}

		{#if subtitle}
			<p class="mt-1 max-h-fit text-sm text-base-content/70">
				{subtitle}
			</p>
		{/if}

		{#if children}
			<div class="mt-4 h-full flex-1 flex-col justify-between">
				{@render children()}
			</div>
		{/if}

		{#if actions}
			<div class="card-actions justify-end">
				{@render actions()}
			</div>
		{/if}
	</div>
</section>
