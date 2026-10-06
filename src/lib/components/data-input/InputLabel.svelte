<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils.js';

	interface Props {
		required?: boolean;
		children?: Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, required = false, class: className, ...rest }: Props = $props();
</script>

<legend class={cn('fieldset-legend', className)} {...rest}>
	{@render children?.()}
	{#if required}
		<span class="text-error">*</span>
	{/if}
</legend>
