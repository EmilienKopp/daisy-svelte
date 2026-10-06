<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { cn, dot } from '../../utils.js';
	import type { DataAction, DataHeader, Paginated } from './types.js';

	interface Props {
		/** Plain array of rows (use either this or paginatedData) */
		data?: T[];
		/** Paginated rows with links (Laravel-style paginator shape) */
		paginatedData?: Paginated<T>;
		/** Column definitions */
		headers?: DataHeader<T>[];
		/** Row actions rendered in a trailing cell */
		actions?: DataAction<T>[];
		/** Called when a row (not an action) is clicked */
		onRowClick?: (row: T) => void;
		/** Extra classes for the <table> element */
		class?: string;
		/** daisyUI zebra striping */
		zebra?: boolean;
		/** Table density */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/** Header label of the actions column */
		actionsLabel?: string;
		/** Text shown when there are no rows */
		emptyText?: string;
		/** Custom empty state */
		empty?: Snippet;
		/** Custom cell rendering; falls back to header-driven rendering */
		cell?: Snippet<[{ row: T; header: DataHeader<T>; value: unknown }]>;
	}

	let {
		data,
		paginatedData,
		headers = [],
		actions,
		onRowClick,
		class: className = '',
		zebra = true,
		size = 'sm',
		actionsLabel = 'Actions',
		emptyText = 'No data available',
		empty,
		cell
	}: Props = $props();

	const rows = $derived(paginatedData ? paginatedData.data : (data ?? []));
	const visibleActions = $derived(
		(actions ?? []).slice().sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
	);

	function cellValue(row: T, header: DataHeader<T>): unknown {
		return dot(row, header.key);
	}

	function formatted(row: T, header: DataHeader<T>): string {
		if (header.combined) return header.combined(row);
		const value = cellValue(row, header);
		if (value === null || value === undefined) return '-';
		return header.formatter ? header.formatter(value) : String(value);
	}
</script>

{#if rows.length === 0}
	{#if empty}
		{@render empty()}
	{:else}
		<div class="p-4 text-center text-base-content/60">{emptyText}</div>
	{/if}
{:else}
	<div class="overflow-x-auto rounded-lg shadow-md">
		<table
			class={cn(
				'table w-full',
				zebra && 'table-zebra',
				size === 'xs' && 'table-xs',
				size === 'sm' && 'table-sm',
				size === 'lg' && 'table-lg',
				className
			)}
		>
			<thead>
				<tr>
					{#each headers as header (header.key)}
						<th class="bg-primary font-bold uppercase text-primary-content">
							{header.label}
						</th>
					{/each}
					{#if visibleActions.length}
						<th class="bg-primary text-center font-bold uppercase text-primary-content">
							{actionsLabel}
						</th>
					{/if}
				</tr>
			</thead>

			<tbody>
				{#each rows as row, rowIndex (rowIndex)}
					<tr
						class={cn(
							'transition-colors duration-200 hover:bg-base-300',
							onRowClick && 'cursor-pointer'
						)}
						onclick={onRowClick ? () => onRowClick(row) : undefined}
					>
						{#each headers as header (header.key)}
							{@const value = cellValue(row, header)}
							<td
								class="max-w-72 truncate whitespace-nowrap"
								style={header.maxWidth ? `max-width: ${header.maxWidth}` : undefined}
							>
								{#if cell}
									{@render cell({ row, header, value })}
								{:else}
									<div class="flex items-center gap-1">
										{#if header.icon}
											{@const Icon = header.icon(row)}
											<span title={String(value ?? '')} class={header.iconClass?.(row)}>
												<Icon class="h-5 w-5" />
											</span>
										{/if}
										{#if !header.iconOnly}
											{formatted(row, header)}
										{/if}
									</div>
								{/if}
							</td>
						{/each}
						{#if visibleActions.length}
							<td class="text-center">
								<div class="flex items-center justify-center gap-2">
									{#each visibleActions as action (action.label)}
										{#if !action.hidden?.(row)}
											{#if action.href?.(row)}
												<a
													href={action.href(row)}
													title={action.iconOnly ? action.label : undefined}
													class={cn(
														'flex items-center gap-1 px-1 hover:underline',
														action.css?.(row)
													)}
													onclick={(e) => e.stopPropagation()}
												>
													{#if action.icon}
														{@const Icon = action.icon(row)}
														<Icon class="h-4 w-4" />
													{/if}
													{#if !action.iconOnly}{action.label}{/if}
												</a>
											{:else}
												<button
													type="button"
													title={action.iconOnly ? action.label : undefined}
													disabled={action.disabled?.(row)}
													class={cn(
														'flex cursor-pointer items-center gap-1 px-1 hover:underline disabled:cursor-not-allowed disabled:opacity-50',
														action.css?.(row)
													)}
													onclick={(e) => {
														e.stopPropagation();
														action.callback?.(row);
													}}
												>
													{#if action.icon}
														{@const Icon = action.icon(row)}
														<Icon class="h-4 w-4" />
													{/if}
													{#if !action.iconOnly}{action.label}{/if}
												</button>
											{/if}
										{/if}
									{/each}
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if paginatedData?.links?.length}
		<div class="join my-2 flex w-full justify-center">
			{#each paginatedData.links as link, i (i)}
				<a
					href={link.url ?? undefined}
					class={cn(
						'btn join-item btn-sm',
						link.active ? 'btn-primary' : 'btn-ghost',
						!link.url && 'btn-disabled'
					)}
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- paginator labels contain entities like &laquo; -->
					{@html link.label}
				</a>
			{/each}
		</div>
	{/if}
{/if}
