<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			placeholder: { control: 'text' },
			required: { control: 'boolean' },
			error: { control: 'text' }
		}
	});

	const fruitOptions = [
		{ value: 'apple', name: 'Apple' },
		{ value: 'banana', name: 'Banana' },
		{ value: 'cherry', name: 'Cherry' }
	];

	const users = [
		{ id: 1, fullName: 'Ada Lovelace' },
		{ id: 2, fullName: 'Grace Hopper' },
		{ id: 3, fullName: 'Katherine Johnson' }
	];
</script>

<Story
	name="Basic"
	args={{ label: 'Fruit', name: 'fruit', options: fruitOptions, value: '' }}
/>

<Story
	name="Record options"
	args={{
		label: 'Status',
		name: 'status',
		options: { draft: 'draft', in_review: 'review', published: 'published' },
		value: ''
	}}
/>

<Story
	name="Items with mapping"
	args={{
		label: 'Assignee',
		name: 'assignee',
		items: users,
		mapping: { valueColumn: 'id', labelColumn: 'fullName' },
		placeholder: 'Pick a user',
		value: ''
	}}
/>

<Story
	name="With error"
	args={{
		label: 'Fruit',
		name: 'fruit',
		options: fruitOptions,
		value: '',
		required: true,
		error: 'Please choose a fruit.'
	}}
/>

<Story name="Custom option children" args={{ label: 'Priority', name: 'priority', value: '' }}>
	{#snippet template(args)}
		<Select {...args}>
			<option value="low">Low 🟢</option>
			<option value="medium">Medium 🟡</option>
			<option value="high">High 🔴</option>
		</Select>
	{/snippet}
</Story>
