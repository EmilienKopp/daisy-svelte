<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataList from './DataList.svelte';
	import type { DataHeader } from './types.js';

	type User = {
		name: string;
		email: string;
		role: string;
		active: boolean;
		verified: boolean;
		address: { city: string };
		createdAt: string;
	};

	const user: User = {
		name: 'Ada Lovelace',
		email: 'ada@example.com',
		role: 'admin',
		active: true,
		verified: false,
		address: { city: 'London' },
		createdAt: '2024-03-15'
	};

	const headers: DataHeader<User>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role', formatter: (v) => String(v).toUpperCase() },
		{ key: 'address.city', label: 'City' },
		{ key: 'createdAt', label: 'Joined' }
	];

	const booleanHeaders: DataHeader<User>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'active', label: 'Active' },
		{ key: 'verified', label: 'Verified' }
	];

	const { Story } = defineMeta({
		title: 'Display/DataList',
		component: DataList,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<DataList {headers} data={user} />
	{/snippet}
</Story>

<Story name="Boolean Labels">
	{#snippet template()}
		<DataList headers={booleanHeaders} data={user} />
	{/snippet}
</Story>

<Story name="Custom Boolean Labels">
	{#snippet template()}
		<DataList
			headers={booleanHeaders}
			data={user}
			booleanLabels={{ true: 'Enabled', false: 'Disabled' }}
		/>
	{/snippet}
</Story>

<Story name="Custom Value Snippet">
	{#snippet template()}
		<DataList {headers} data={user}>
			{#snippet value({ header, value })}
				{#if header.key === 'role'}
					<span class="badge badge-primary badge-sm">{value}</span>
				{:else}
					{value ?? '-'}
				{/if}
			{/snippet}
		</DataList>
	{/snippet}
</Story>

<Story name="Missing Data">
	{#snippet template()}
		<DataList {headers} />
	{/snippet}
</Story>
