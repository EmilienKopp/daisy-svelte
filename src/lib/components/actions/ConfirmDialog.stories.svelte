<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Actions/ConfirmDialog',
		component: ConfirmDialog,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text' },
			message: { control: 'text' },
			confirmText: { control: 'text' },
			cancelText: { control: 'text' },
			disabled: { control: 'boolean' }
		}
	});
</script>

<script>
	/** @type {ConfirmDialog | undefined} */
	let dialogRef = $state();
	let lastResult = $state('');
</script>

<Story
	name="With trigger snippet"
	args={{
		title: 'Delete item?',
		message: 'This action cannot be undone.',
		confirmText: 'Delete',
		cancelText: 'Keep it'
	}}
>
	{#snippet template(args)}
		<ConfirmDialog {...args} title={args.title ?? 'Delete item?'}>
			{#snippet trigger({ disabled, show })}
				<Button variant="danger" {disabled} onclick={show}>Delete</Button>
			{/snippet}
		</ConfirmDialog>
	{/snippet}
</Story>

<Story name="Programmatic open">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<Button onclick={() => dialogRef?.show()}>Open via ref</Button>
			{#if lastResult}
				<span>Last action: {lastResult}</span>
			{/if}
		</div>

		<ConfirmDialog
			bind:this={dialogRef}
			title="Publish article?"
			message="It will be visible to everyone."
			onConfirm={() => (lastResult = 'confirmed')}
			onCancel={() => (lastResult = 'cancelled')}
		/>
	{/snippet}
</Story>

<Story name="With extra body content" args={{ title: 'Transfer ownership' }}>
	{#snippet template(args)}
		<ConfirmDialog {...args} title={args.title ?? 'Transfer ownership'}>
			{#snippet trigger({ show })}
				<Button variant="warning" onclick={show}>Transfer</Button>
			{/snippet}
			<div class="alert alert-warning mt-2">You will lose admin rights immediately.</div>
		</ConfirmDialog>
	{/snippet}
</Story>
