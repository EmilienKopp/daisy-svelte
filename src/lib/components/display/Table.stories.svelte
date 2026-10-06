<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from './Table.svelte';
	import type { DataAction, DataHeader, Paginated } from './types.js';

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
		{ id: 3, name: 'Alan Turing', email: 'alan@example.com', role: 'viewer', active: false },
		{ id: 4, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'editor', active: true }
	];

	const headers: DataHeader<User>[] = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role', formatter: (v) => String(v).toUpperCase() }
	];

	const actions: DataAction<User>[] = [
		{
			label: 'Edit',
			callback: (row) => alert(`Edit ${row.name}`),
			css: () => 'text-primary',
			position: 1
		},
		{
			label: 'Delete',
			callback: (row) => alert(`Delete ${row.name}`),
			css: () => 'text-error',
			disabled: (row) => row.role === 'admin',
			position: 2
		},
		{
			label: 'Profile',
			href: (row) => `/users/${row.id}`,
			position: 3
		}
	];

	const paginated: Paginated<User> = {
		data: users,
		current_page: 2,
		last_page: 4,
		per_page: 4,
		total: 16,
		links: [
			{ url: '#page-1', label: '&laquo; Previous', active: false },
			{ url: '#page-1', label: '1', active: false },
			{ url: null, label: '2', active: true },
			{ url: '#page-3', label: '3', active: false },
			{ url: '#page-4', label: '4', active: false },
			{ url: '#page-3', label: 'Next &raquo;', active: false }
		]
	};

	const { Story } = defineMeta({
		title: 'Display/Table',
		component: Table,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
			zebra: { control: 'boolean' }
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Table data={users} {headers} />
	{/snippet}
</Story>

<Story name="With Actions">
	{#snippet template()}
		<Table data={users} {headers} {actions} />
	{/snippet}
</Story>

<Story name="Clickable Rows">
	{#snippet template()}
		<Table data={users} {headers} onRowClick={(row) => alert(`Clicked ${row.name}`)} />
	{/snippet}
</Story>

<Story name="Paginated">
	{#snippet template()}
		<Table paginatedData={paginated} {headers} />
	{/snippet}
</Story>

<Story name="Empty">
	{#snippet template()}
		<Table data={[] as User[]} {headers} emptyText="No users found" />
	{/snippet}
</Story>

<Story name="Custom Cell">
	{#snippet template()}
		<Table data={users} {headers}>
			{#snippet cell({ header, value })}
				{#if header.key === 'role'}
					<span class="badge badge-secondary badge-sm">{value}</span>
				{:else}
					{value}
				{/if}
			{/snippet}
		</Table>
	{/snippet}
</Story>
