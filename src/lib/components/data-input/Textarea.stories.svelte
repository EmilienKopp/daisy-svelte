<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			placeholder: { control: 'text' },
			rows: { control: { type: 'number', min: 1, max: 20 } },
			required: { control: 'boolean' },
			error: { control: 'text' }
		}
	});
</script>

<Story
	name="Basic"
	args={{ label: 'Bio', name: 'bio', placeholder: 'Tell us about yourself...' }}
/>

<Story
	name="With error"
	args={{
		label: 'Description',
		name: 'description',
		value: 'Too short',
		error: 'Description must be at least 50 characters.'
	}}
/>

<Story
	name="Tall and required"
	args={{ label: 'Cover letter', name: 'cover', rows: 10, required: true }}
/>
