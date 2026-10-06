<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FilterSearch from './FilterSearch.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/FilterSearch',
		component: FilterSearch,
		tags: ['autodocs'],
		argTypes: {
			placeholder: { control: 'text' },
			alwaysDynamic: { control: 'boolean' },
			alwaysStatic: { control: 'boolean' }
		}
	});

	const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
</script>

<script>
	let results = $state(fruits);

	/** @param {string} query */
	function filter(query) {
		results = fruits.filter((f) => f.toLowerCase().includes(query.toLowerCase()));
	}

	function reset() {
		results = fruits;
	}
</script>

<Story name="Filtering a list">
	{#snippet template()}
		<div class="flex max-w-md flex-col gap-4">
			<FilterSearch
				searchHandler={filter}
				clearHandler={reset}
				paramKey=""
				placeholder="Filter fruits..."
			/>
			<ul class="list-inside list-disc">
				{#each results as fruit (fruit)}
					<li>{fruit}</li>
				{/each}
			</ul>
		</div>
	{/snippet}
</Story>

<Story
	name="Static (search on submit only)"
	args={{
		searchHandler: (q) => console.log('search', q),
		alwaysStatic: true,
		paramKey: '',
		placeholder: 'Press Search to filter'
	}}
/>

<Story
	name="Dynamic (search while typing)"
	args={{
		searchHandler: (q) => console.log('search', q),
		alwaysDynamic: true,
		paramKey: '',
		placeholder: 'Type to filter'
	}}
/>
