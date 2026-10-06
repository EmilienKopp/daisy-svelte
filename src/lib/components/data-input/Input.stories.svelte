<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: [
					'text',
					'number',
					'file',
					'search',
					'tel',
					'url',
					'email',
					'password',
					'date',
					'time',
					'datetime-local',
					'month',
					'week',
					'color'
				]
			},
			required: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			hint: { control: 'text' },
			error: { control: 'text' }
		}
	});
</script>

<Story
	name="Basic"
	args={{ label: 'Name', name: 'name', placeholder: 'Jane Doe' }}
/>

<Story
	name="With error"
	args={{
		label: 'Email',
		name: 'email',
		type: 'email',
		value: 'not-an-email',
		error: 'Please enter a valid email address.'
	}}
/>

<Story
	name="With hint"
	args={{
		label: 'Username',
		name: 'username',
		hint: 'Lowercase letters and numbers only.',
		placeholder: 'jdoe42'
	}}
/>

<Story
	name="Required"
	args={{ label: 'Company', name: 'company', required: true }}
/>

<Story name="Types">
	{#snippet template()}
		<div class="flex max-w-sm flex-col gap-2">
			<Input label="Number" name="qty" type="number" value={3} />
			<Input label="Date" name="date" type="date" />
			<Input label="Color" name="color" type="color" class="w-24" />
			<Input label="Search" name="q" type="search" placeholder="Search..." />
		</div>
	{/snippet}
</Story>
