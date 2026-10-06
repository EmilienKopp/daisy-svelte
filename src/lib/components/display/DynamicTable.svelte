<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { cn, dot } from '../../utils.js';
	import type { DataHeader } from './types.js';

	interface Props {
		/** Column definitions, reordered in place when dragged (bindable) */
		columns: DataHeader<T>[];
		/** Data rows */
		rows?: T[];
		/** Allow drag-and-drop column reordering */
		reorderable?: boolean;
		/** Extra classes for the <table> element */
		class?: string;
		/** daisyUI zebra striping */
		zebra?: boolean;
		/** Custom cell rendering */
		cell?: Snippet<[{ row: T; column: DataHeader<T>; value: unknown }]>;
		/** Called after columns are reordered */
		onReorder?: (columns: DataHeader<T>[]) => void;
	}

	let {
		columns = $bindable([]),
		rows = [],
		reorderable = true,
		class: className = '',
		zebra = true,
		cell,
		onReorder
	}: Props = $props();

	let dragIndex = $state<number | null>(null);
	let overIndex = $state<number | null>(null);

	function handleDragStart(event: DragEvent, index: number) {
		dragIndex = index;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/plain', String(index));
		}
	}

	function handleDragOver(event: DragEvent, index: number) {
		event.preventDefault();
		overIndex = index;
	}

	function handleDrop(event: DragEvent, index: number) {
		event.preventDefault();
		if (dragIndex === null || dragIndex === index) {
			reset();
			return;
		}
		const next = [...columns];
		const [moved] = next.splice(dragIndex, 1);
		next.splice(index, 0, moved);
		columns = next;
		onReorder?.(next);
		reset();
	}

	function reset() {
		dragIndex = null;
		overIndex = null;
	}

	function display(row: T, column: DataHeader<T>): string {
		if (column.combined) return column.combined(row);
		const value = dot(row, column.key);
		if (value === null || value === undefined) return '-';
		return column.formatter ? column.formatter(value) : String(value);
	}
</script>

<div class="overflow-x-auto rounded-lg shadow-md">
	<table class={cn('table w-full table-fixed', zebra && 'table-zebra', className)}>
		<thead>
			<tr>
				{#each columns as column, index (column.key)}
					<th
						class={cn(
							'bg-primary font-bold uppercase text-primary-content',
							reorderable && 'cursor-grab select-none',
							dragIndex === index && 'opacity-50',
							overIndex === index && dragIndex !== index && 'outline-2 outline-dashed outline-base-300 -outline-offset-2'
						)}
						draggable={reorderable}
						ondragstart={(e) => handleDragStart(e, index)}
						ondragover={(e) => handleDragOver(e, index)}
						ondragleave={() => (overIndex = null)}
						ondrop={(e) => handleDrop(e, index)}
						ondragend={reset}
					>
						{column.label}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row, rowIndex (rowIndex)}
				<tr class="hover:bg-base-300">
					{#each columns as column (column.key)}
						{@const value = dot(row, column.key)}
						<td class="truncate">
							{#if cell}
								{@render cell({ row, column, value })}
							{:else if typeof value === 'boolean'}
								<input type="checkbox" class="checkbox checkbox-sm" checked={value} disabled />
							{:else}
								{display(row, column)}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
