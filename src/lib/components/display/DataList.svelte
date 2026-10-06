<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { cn, dot } from '../../utils.js';
	import type { DataHeader } from './types.js';

	interface Props {
		/** Field definitions (key supports dot notation, formatter optional) */
		headers: DataHeader<T>[];
		/** The record to display */
		data?: T;
		/** Extra classes for the <dl> grid */
		class?: string;
		/** Labels shown for boolean values */
		booleanLabels?: { true: string; false: string };
		/** Custom value rendering */
		value?: Snippet<[{ header: DataHeader<T>; value: unknown }]>;
	}

	let {
		headers,
		data,
		class: className = '',
		booleanLabels = { true: 'Yes', false: 'No' },
		value
	}: Props = $props();
</script>

<dl class={cn('grid grid-cols-[auto_1fr] gap-x-4 gap-y-2', className)}>
	{#each headers as header (header.key)}
		{@const resolved = dot(data, header.key)}
		<dt class="font-bold">{header.label}:</dt>
		<dd>
			{#if value}
				{@render value({ header, value: resolved })}
			{:else if resolved === true}
				{booleanLabels.true}
			{:else if resolved === false}
				{booleanLabels.false}
			{:else if resolved !== null && resolved !== undefined}
				{header.formatter ? header.formatter(resolved) : resolved}
			{:else}
				-
			{/if}
		</dd>
	{/each}
</dl>
