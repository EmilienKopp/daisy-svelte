<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '../../utils/cn.js';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		active?: boolean;
		/** Called on click, e.g. to delegate navigation to a router. */
		onNavigate?: (event: MouseEvent, href: string) => void;
		class?: string;
		children?: Snippet;
	}

	let { href, active = false, onNavigate, class: className, children, ...rest }: Props = $props();
</script>

<a
	{href}
	class={cn(
		'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
		active
			? 'border-primary text-base-content focus:border-primary'
			: 'text-base-content/60 hover:text-base-content hover:border-base-300 focus:text-base-content focus:border-base-300 border-transparent',
		className
	)}
	aria-current={active ? 'page' : undefined}
	onclick={(e) => onNavigate?.(e, href)}
	{...rest}
>
	{@render children?.()}
</a>
