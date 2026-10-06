<script lang="ts">
	import { cn } from '../../utils.js';

	interface Props {
		message?: string | null;
		class?: string;
	}

	let { message, class: className }: Props = $props();
</script>

{#if message}
	<p class={cn('text-error mt-1 text-xs', className)}>{message}</p>
{/if}
