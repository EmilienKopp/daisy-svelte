<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BaseButton from './BaseButton.svelte';

	const { Story } = defineMeta({
		title: 'Actions/BaseButton',
		component: BaseButton,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BaseButton {...args}>Base button</BaseButton>
	{/snippet}
</Story>

<Story name="With daisyUI classes" args={{ class: 'btn-secondary btn-lg' }}>
	{#snippet template(args)}
		<BaseButton {...args}>Large secondary</BaseButton>
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet template(args)}
		<BaseButton {...args}>Disabled</BaseButton>
	{/snippet}
</Story>
