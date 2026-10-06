<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '../../utils/cn.js';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		/** Suggested filename for the downloaded file. */
		filename?: string;
		class?: string;
		children?: Snippet;
	}

	let { href, filename, class: className, children, ...rest }: Props = $props();
</script>

<a {href} download={filename ?? true} class={cn('btn btn-primary btn-sm', className)} {...rest}>
	{@render children?.()}
</a>
