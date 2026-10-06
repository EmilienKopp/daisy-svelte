<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingButton from './LoadingButton.svelte';

	const { Story } = defineMeta({
		title: 'Actions/LoadingButton',
		component: LoadingButton,
		tags: ['autodocs'],
		argTypes: {
			loading: { control: 'boolean' },
			loadingText: { control: 'text' },
			disabled: { control: 'boolean' }
		}
	});
</script>

<script>
	let busy = $state(false);

	function simulate() {
		busy = true;
		setTimeout(() => (busy = false), 2000);
	}
</script>

<Story name="Idle" args={{ loading: false }}>
	{#snippet template(args)}
		<LoadingButton {...args}>Submit</LoadingButton>
	{/snippet}
</Story>

<Story name="Loading" args={{ loading: true, loadingText: 'Saving...' }}>
	{#snippet template(args)}
		<LoadingButton {...args}>Submit</LoadingButton>
	{/snippet}
</Story>

<Story name="Interactive">
	{#snippet template()}
		<LoadingButton loading={busy} loadingText="Working..." onclick={simulate}>
			Click to simulate work
		</LoadingButton>
	{/snippet}
</Story>
