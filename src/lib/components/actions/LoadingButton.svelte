<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	interface Props {
		loading?: boolean;
		loadingText?: string;
		disabled?: boolean;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		loading = false,
		loadingText = 'Loading...',
		disabled,
		children,
		...rest
	}: Props = $props();
</script>

<Button {...rest} {loading} disabled={disabled || loading}>
	{#if loading}
		<span>{loadingText}</span>
	{:else}
		{@render children?.()}
	{/if}
</Button>
