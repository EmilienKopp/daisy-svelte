<script lang="ts">
	import { cn } from '../../utils/cn.js';

	export interface PaginationLink {
		url: string | null;
		label: string;
		active: boolean;
	}

	interface Props {
		/** Current page (1-based). Bindable. */
		currentPage?: number;
		/** Total number of pages. */
		totalPages?: number;
		/** Optional Laravel-style links array; used to derive totalPages when provided. */
		links?: PaginationLink[];
		/** Called with the new page number on navigation. */
		onPageChange?: (page: number) => void;
		/** Prev / Next + "Page x of y" only, no page-number buttons. */
		simple?: boolean;
		/** Number of page buttons shown on each side of the current page. */
		siblingCount?: number;
		/** daisyUI button size. */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	}

	let {
		currentPage = $bindable(1),
		totalPages,
		links,
		onPageChange,
		simple = false,
		siblingCount = 1,
		size = 'sm',
		class: className
	}: Props = $props();

	const sizeClass: Record<string, string> = {
		xs: 'btn-xs',
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg',
		xl: 'btn-xl'
	};

	const lastPage = $derived.by(() => {
		if (totalPages) return totalPages;
		if (links?.length) {
			// Laravel's links include prev/next entries; numeric labels give the page count.
			const numeric = links
				.map((l) => Number.parseInt(l.label, 10))
				.filter((n) => !Number.isNaN(n));
			return numeric.length ? Math.max(...numeric) : 1;
		}
		return 1;
	});

	/** Page numbers to render, with null marking an ellipsis gap. */
	const pages = $derived.by(() => {
		const total = lastPage;
		const result: (number | null)[] = [];
		let prev = 0;
		for (let page = 1; page <= total; page++) {
			const keep =
				page === 1 || page === total || Math.abs(page - currentPage) <= siblingCount;
			if (!keep) continue;
			if (prev && page - prev > 1) result.push(null);
			result.push(page);
			prev = page;
		}
		return result;
	});

	function goTo(page: number) {
		if (page < 1 || page > lastPage || page === currentPage) return;
		currentPage = page;
		onPageChange?.(page);
	}
</script>

{#if lastPage > 1}
	{#if simple}
		<div class={cn('flex items-center justify-between gap-2', className)}>
			<button
				type="button"
				class={cn('btn btn-outline', sizeClass[size])}
				disabled={currentPage <= 1}
				onclick={() => goTo(currentPage - 1)}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Previous
			</button>

			<span class="text-base-content/70 text-sm">
				Page {currentPage} of {lastPage}
			</span>

			<button
				type="button"
				class={cn('btn btn-outline', sizeClass[size])}
				disabled={currentPage >= lastPage}
				onclick={() => goTo(currentPage + 1)}
			>
				Next
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	{:else}
		<nav class={cn('join', className)} aria-label="Pagination">
			<button
				type="button"
				class={cn('join-item btn', sizeClass[size])}
				disabled={currentPage <= 1}
				aria-label="Previous page"
				onclick={() => goTo(currentPage - 1)}
			>
				«
			</button>
			{#each pages as page, i (page ?? `gap-${i}`)}
				{#if page === null}
					<button type="button" class={cn('join-item btn btn-disabled', sizeClass[size])}>…</button>
				{:else}
					<button
						type="button"
						class={cn('join-item btn', sizeClass[size], page === currentPage && 'btn-active')}
						aria-current={page === currentPage ? 'page' : undefined}
						onclick={() => goTo(page)}
					>
						{page}
					</button>
				{/if}
			{/each}
			<button
				type="button"
				class={cn('join-item btn', sizeClass[size])}
				disabled={currentPage >= lastPage}
				aria-label="Next page"
				onclick={() => goTo(currentPage + 1)}
			>
				»
			</button>
		</nav>
	{/if}
{/if}
