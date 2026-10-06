<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultiSelect from './MultiSelect.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/MultiSelect',
		component: MultiSelect,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			placeholder: { control: 'text' },
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			maxBadges: { control: 'number' },
			error: { control: 'text' }
		}
	});

	const tagOptions = [
		{ name: 'Svelte', value: 'svelte' },
		{ name: 'TypeScript', value: 'ts' },
		{ name: 'Tailwind', value: 'tailwind' },
		{ name: 'daisyUI', value: 'daisyui' },
		{ name: 'Storybook', value: 'storybook' },
		{ name: 'Vite', value: 'vite' }
	];
</script>

<Story
	name="Basic"
	args={{ label: 'Tags', options: tagOptions, placeholder: 'Pick tags...' }}
/>

<Story
	name="Preselected with overflow badge"
	args={{
		label: 'Stack',
		options: tagOptions,
		selected: ['svelte', 'ts', 'tailwind', 'daisyui', 'storybook'],
		maxBadges: 3
	}}
/>

<Story
	name="Disabled"
	args={{ label: 'Tags', options: tagOptions, selected: ['svelte'], disabled: true }}
/>

<Story
	name="With error"
	args={{
		label: 'Categories',
		options: tagOptions,
		required: true,
		error: 'Select at least one category.'
	}}
/>
