<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DynamicTable from './DynamicTable.svelte';
	import type { DataHeader } from './types.js';

	type User = {
		id: number;
		name: string;
		email: string;
		role: string;
		active: boolean;
	};

	const users: User[] = [
		{ id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin', active: true },
		{ id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'editor', active: true },
		{ id: 3, name: 'Alan Turing', email: 'alan@example.com', role: 'viewer', active: false }
	];

	const baseColumns: DataHeader<User>[] = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' },
		{ key: 'active', label: 'Active' }
	];

	const { Story } = defineMeta({
		title: 'Display/DynamicTable',
		component: DynamicTable,
		tags: ['autodocs'],
		argTypes: {
			reorderable: { control: 'boolean' },
			zebra: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	let reorderableColumns = $state<DataHeader<User>[]>([...baseColumns]);
	let staticColumns = $state<DataHeader<User>[]>([...baseColumns]);
	let customCellColumns = $state<DataHeader<User>[]>([...baseColumns]);
	let lastOrder = $state('');
</script>

<Story name="Reorderable (drag the headers)">
	{#snippet template()}
		<div class="space-y-2">
			<DynamicTable
				bind:columns={reorderableColumns}
				rows={users}
				onReorder={(cols) => (lastOrder = cols.map((c) => c.key).join(', '))}
			/>
			{#if lastOrder}
				<p class="text-sm text-base-content/70">New order: {lastOrder}</p>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="Not Reorderable">
	{#snippet template()}
		<DynamicTable bind:columns={staticColumns} rows={users} reorderable={false} />
	{/snippet}
</Story>

<Story name="Custom Cell">
	{#snippet template()}
		<DynamicTable bind:columns={customCellColumns} rows={users} reorderable={false}>
			{#snippet cell({ column, value })}
				{#if column.key === 'role'}
					<span class="badge badge-accent badge-sm">{value}</span>
				{:else if typeof value === 'boolean'}
					{value ? 'Yes' : 'No'}
				{:else}
					{value}
				{/if}
			{/snippet}
		</DynamicTable>
	{/snippet}
</Story>
