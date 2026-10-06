<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Heading from './Heading.svelte';

	const { Story } = defineMeta({
		title: 'Display/Heading',
		component: Heading,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['default', 'small'] }
		}
	});
</script>

<Story name="Default" args={{ title: 'Dashboard' }} />

<Story
	name="With Description"
	args={{
		title: 'Team Members',
		description: 'Manage who has access to this workspace.'
	}}
/>

<Story
	name="Small Variant"
	args={{
		title: 'Recent activity',
		description: 'Last 7 days',
		variant: 'small'
	}}
/>

<Story name="With Actions" args={{ title: 'Projects', description: 'All active projects.' }}>
	{#snippet template(args)}
		<Heading {...args}>
			<button type="button" class="btn btn-primary btn-sm">New project</button>
		</Heading>
	{/snippet}
</Story>
