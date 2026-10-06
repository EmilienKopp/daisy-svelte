<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CheckboxGroup from './CheckboxGroup.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/CheckboxGroup',
		component: CheckboxGroup,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			checked: { control: 'boolean' },
			error: { control: 'text' }
		}
	});
</script>

<Story name="With label" args={{ label: 'Subscribe to newsletter' }} />

<Story name="Checked" args={{ label: 'Remember me', checked: true }} />

<Story
	name="With error"
	args={{
		label: 'Accept terms and conditions',
		error: 'You must accept the terms to continue.'
	}}
/>
