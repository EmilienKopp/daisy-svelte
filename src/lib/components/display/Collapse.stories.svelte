<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Collapse from './Collapse.svelte';

	const { Story } = defineMeta({
		title: 'Display/Collapse',
		component: Collapse,
		tags: ['autodocs'],
		argTypes: {
			icon: { control: 'select', options: ['arrow', 'plus', 'none'] }
		}
	});
</script>

<script lang="ts">
	let boundOpen = $state(true);
</script>

<Story name="Default" args={{ title: 'Click to expand', icon: 'arrow' }}>
	{#snippet template(args)}
		<Collapse {...args}>
			<p>Hidden content revealed when the collapse is open.</p>
		</Collapse>
	{/snippet}
</Story>

<Story name="Plus Icon" args={{ title: 'More details', icon: 'plus' }}>
	{#snippet template(args)}
		<Collapse {...args}>
			<p>Content behind a plus/minus indicator.</p>
		</Collapse>
	{/snippet}
</Story>

<Story name="Bound Open State">
	{#snippet template()}
		<div class="space-y-2">
			<button type="button" class="btn btn-sm btn-primary" onclick={() => (boundOpen = !boundOpen)}>
				Toggle from outside (open: {boundOpen})
			</button>
			<Collapse title="Externally controlled" bind:open={boundOpen}>
				<p>The open state is bindable and starts open here.</p>
			</Collapse>
		</div>
	{/snippet}
</Story>

<Story name="Custom Header">
	{#snippet template()}
		<Collapse icon="none">
			{#snippet header()}
				<div class="flex items-center gap-2">
					<span class="badge badge-success badge-sm">OK</span>
					<span>Custom header snippet</span>
				</div>
			{/snippet}
			<p>The header snippet replaces the plain-text title.</p>
		</Collapse>
	{/snippet}
</Story>
