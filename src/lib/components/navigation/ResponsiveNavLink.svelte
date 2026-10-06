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
		'block w-full border-l-4 py-2 pe-4 ps-3 text-start text-base font-medium transition duration-150 ease-in-out focus:outline-none',
		active
			? 'border-primary text-primary bg-primary/10 focus:bg-primary/20 focus:border-primary'
			: 'text-base-content/70 hover:text-base-content hover:bg-base-200 hover:border-base-300 focus:text-base-content focus:bg-base-200 focus:border-base-300 border-transparent',
		className
	)}
	aria-current={active ? 'page' : undefined}
	onclick={(e) => onNavigate?.(e, href)}
	{...rest}
>
	{@render children?.()}
</a>
