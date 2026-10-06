<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Modal',
		component: Modal,
		tags: ['autodocs'],
		argTypes: {
			closeOnBackdrop: { control: 'boolean' }
		}
	});
</script>

<script>
	let basicOpen = $state(false);
	let actionsOpen = $state(false);
	let noBackdropOpen = $state(false);
</script>

<Story name="With trigger">
	{#snippet template()}
		<Button onclick={() => (basicOpen = true)}>Open modal</Button>

		<Modal bind:open={basicOpen}>
			{#snippet title()}Hello!{/snippet}
			<p>Press ESC, click the backdrop, or use the button below to close.</p>
			{#snippet actions()}
				<Button onclick={() => (basicOpen = false)}>Close</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="With actions">
	{#snippet template()}
		<Button onclick={() => (actionsOpen = true)}>Open dialog</Button>

		<Modal bind:open={actionsOpen}>
			{#snippet title()}Save changes?{/snippet}
			<p>Your document has unsaved changes.</p>
			{#snippet actions()}
				<Button variant="ghost" onclick={() => (actionsOpen = false)}>Discard</Button>
				<Button variant="primary" onclick={() => (actionsOpen = false)}>Save</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="No backdrop close">
	{#snippet template()}
		<Button onclick={() => (noBackdropOpen = true)}>Open (backdrop disabled)</Button>

		<Modal bind:open={noBackdropOpen} closeOnBackdrop={false}>
			{#snippet title()}Deliberate choice required{/snippet}
			<p>Clicking outside will not close this modal.</p>
			{#snippet actions()}
				<Button onclick={() => (noBackdropOpen = false)}>Got it</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>
