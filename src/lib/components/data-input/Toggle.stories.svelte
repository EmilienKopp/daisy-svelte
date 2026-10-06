<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toggle from './Toggle.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Toggle',
		component: Toggle,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			checked: { control: 'boolean' },
			required: { control: 'boolean' },
			error: { control: 'text' }
		}
	});
</script>

<Story name="Basic" args={{ label: 'Enable notifications' }} />

<Story name="Checked and required" args={{ label: 'Two-factor auth', checked: true, required: true }} />

<Story
	name="With error"
	args={{ label: 'Marketing emails', error: 'This setting could not be saved.' }}
/>

<Story name="Custom color" args={{ label: 'Dark mode', checked: true, class: 'toggle-accent' }} />
