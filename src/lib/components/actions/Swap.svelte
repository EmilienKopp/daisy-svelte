<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		on: string | Snippet;
		off: string | Snippet;
		checked?: boolean;
		title?: string;
		effect?: 'flip' | 'rotate' | 'none';
		class?: string;
	}

	let {
		on,
		off,
		checked = $bindable(false),
		title,
		effect = 'flip',
		class: css,
	}: Props = $props();
</script>

<label
	class={twMerge(
		clsx('swap', {
			'swap-flip': effect === 'flip',
			'swap-rotate': effect === 'rotate',
		}),
		css,
	)}
>
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" bind:checked />

	<div class="swap-on" {title}>
		{#if typeof on === 'string'}{on}{:else}{@render on()}{/if}
	</div>
	<div class="swap-off" {title}>
		{#if typeof off === 'string'}{off}{:else}{@render off()}{/if}
	</div>
</label>
