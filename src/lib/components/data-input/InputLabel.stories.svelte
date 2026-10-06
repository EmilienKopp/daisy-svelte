<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputLabel from './InputLabel.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/InputLabel',
		component: InputLabel,
		tags: ['autodocs'],
		argTypes: {
			required: { control: 'boolean' }
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<fieldset class="fieldset">
			<InputLabel {...args}>Email address</InputLabel>
		</fieldset>
	{/snippet}
</Story>

<Story name="Required" args={{ required: true }}>
	{#snippet template(args)}
		<fieldset class="fieldset">
			<InputLabel {...args}>Full name</InputLabel>
		</fieldset>
	{/snippet}
</Story>
