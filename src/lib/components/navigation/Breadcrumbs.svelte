<script lang="ts">
	import { cn } from '../../utils/cn.js';

	export interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	interface Props {
		items?: BreadcrumbItem[];
		/** Called on item click, e.g. to delegate navigation to a router. */
		onNavigate?: (event: MouseEvent, item: BreadcrumbItem) => void;
		class?: string;
	}

	let { items = [], onNavigate, class: className }: Props = $props();
</script>

<div class={cn('breadcrumbs text-sm', className)}>
	<ul>
		{#each items as item, index (item.label + (item.href ?? index))}
			<li>
				{#if item.href && index !== items.length - 1}
					<a href={item.href} onclick={(e) => onNavigate?.(e, item)}>{item.label}</a>
				{:else}
					<span aria-current={index === items.length - 1 ? 'page' : undefined}>
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ul>
</div>
