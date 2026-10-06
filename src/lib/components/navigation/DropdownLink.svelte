<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '../../utils/cn.js';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		/** Called on click, e.g. to delegate navigation to a router. */
		onNavigate?: (event: MouseEvent, href: string) => void;
		class?: string;
		children?: Snippet;
	}

	let { href, onNavigate, class: className, children, ...rest }: Props = $props();
</script>

<a
	{href}
	class={cn(
		'text-base-content hover:bg-base-200 focus:bg-base-200 block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out focus:outline-none',
		className
	)}
	onclick={(e) => onNavigate?.(e, href)}
	{...rest}
>
	{@render children?.()}
</a>
