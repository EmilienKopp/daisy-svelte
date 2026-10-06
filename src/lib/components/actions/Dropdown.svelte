<script lang="ts" module>
	export interface DropdownAction {
		text: string;
		href?: string;
		onclick?: (e: MouseEvent) => void;
	}
</script>

<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		actions?: DropdownAction[];
		trigger?: Snippet;
		/** Custom dropdown content, rendered after `actions`. */
		children?: Snippet;
		position?: 'bottom' | 'top' | 'left' | 'right';
		align?: 'start' | 'center' | 'end';
		class?: string;
	}

	let {
		actions = [],
		trigger,
		children,
		position = 'bottom',
		align = 'start',
		class: css,
	}: Props = $props();

	let details: HTMLDetailsElement | undefined = $state();

	function handleAction(action: DropdownAction, e: MouseEvent) {
		action.onclick?.(e);
		if (details) details.open = false;
	}
</script>

<details
	bind:this={details}
	class={clsx('dropdown', {
		'dropdown-bottom': position === 'bottom',
		'dropdown-top': position === 'top',
		'dropdown-left': position === 'left',
		'dropdown-right': position === 'right',
		'dropdown-center': align === 'center',
		'dropdown-end': align === 'end',
	})}
>
	<summary class="flex cursor-pointer items-center rounded-md select-none">
		{@render trigger?.()}
	</summary>

	<ul
		class={twMerge(
			'menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow transition delay-75',
			css,
		)}
	>
		{#each actions as action (action.text)}
			<li>
				{#if action.href}
					<a href={action.href} onclick={(e) => handleAction(action, e)}>{action.text}</a>
				{:else}
					<button type="button" onclick={(e) => handleAction(action, e)}>
						{action.text}
					</button>
				{/if}
			</li>
		{/each}
		{@render children?.()}
	</ul>
</details>
