<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pagination from './Pagination.svelte';

	const laravelLinks = [
		{ url: null, label: '&laquo; Previous', active: false },
		{ url: '/users?page=1', label: '1', active: true },
		{ url: '/users?page=2', label: '2', active: false },
		{ url: '/users?page=3', label: '3', active: false },
		{ url: '/users?page=4', label: '4', active: false },
		{ url: '/users?page=5', label: '5', active: false },
		{ url: '/users?page=2', label: 'Next &raquo;', active: false }
	];

	const { Story } = defineMeta({
		title: 'Navigation/Pagination',
		component: Pagination,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
			simple: { control: 'boolean' },
			siblingCount: { control: { type: 'number', min: 0, max: 3 } }
		}
	});
</script>

<script lang="ts">
	let page = $state(1);
	let simplePage = $state(3);
	let manyPagesPage = $state(10);
	let lastChange = $state<number | null>(null);
</script>

<Story name="Default">
	{#snippet template()}
		<div class="space-y-2">
			<Pagination bind:currentPage={page} totalPages={8} onPageChange={(p) => (lastChange = p)} />
			<p class="text-sm text-base-content/70">
				Current page: {page}{#if lastChange}, last onPageChange: {lastChange}{/if}
			</p>
		</div>
	{/snippet}
</Story>

<Story name="Simple">
	{#snippet template()}
		<Pagination bind:currentPage={simplePage} totalPages={10} simple />
	{/snippet}
</Story>

<Story name="Many Pages (ellipsis)">
	{#snippet template()}
		<Pagination bind:currentPage={manyPagesPage} totalPages={40} siblingCount={1} />
	{/snippet}
</Story>

<Story name="From Laravel Links" args={{ links: laravelLinks }} />

<Story name="Sizes">
	{#snippet template()}
		<div class="space-y-4">
			<Pagination currentPage={2} totalPages={5} size="xs" />
			<Pagination currentPage={2} totalPages={5} size="sm" />
			<Pagination currentPage={2} totalPages={5} size="md" />
			<Pagination currentPage={2} totalPages={5} size="lg" />
		</div>
	{/snippet}
</Story>
