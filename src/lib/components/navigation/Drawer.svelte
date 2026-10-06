<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils/cn.js';

	interface Props {
		/** Whether the drawer is open. Bindable. */
		open?: boolean;
		/** Place the drawer on the right side. */
		end?: boolean;
		/** Keep the drawer visible as a sidebar on large screens. */
		responsive?: boolean;
		/** id of the hidden toggle checkbox; pair it with a <label for={id}> trigger. */
		id?: string;
		/** Extra classes for the drawer side panel. */
		sideClass?: string;
		class?: string;
		/** Main page content. */
		children?: Snippet;
		/** Drawer panel content. */
		side?: Snippet;
	}

	const uid = $props.id();

	let {
		open = $bindable(false),
		end = false,
		responsive = false,
		id = `drawer-${uid}`,
		sideClass,
		class: className,
		children,
		side
	}: Props = $props();
</script>

<div class={cn('drawer', end && 'drawer-end', responsive && 'lg:drawer-open', className)}>
	<input {id} type="checkbox" class="drawer-toggle" bind:checked={open} />
	<div class="drawer-content">
		{@render children?.()}
	</div>
	<div class="drawer-side">
		<label for={id} aria-label="Close drawer" class="drawer-overlay"></label>
		<div class={cn('bg-base-200 text-base-content min-h-full w-80 p-4', sideClass)}>
			{@render side?.()}
		</div>
	</div>
</div>
