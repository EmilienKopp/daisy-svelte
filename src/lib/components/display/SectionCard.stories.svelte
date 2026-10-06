<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SectionCard from './SectionCard.svelte';

	const { Story } = defineMeta({
		title: 'Display/SectionCard',
		component: SectionCard,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ title: 'Profile', subtitle: 'Your public information.' }}>
	{#snippet template(args)}
		<SectionCard {...args}>
			<p>Name, avatar and bio are visible to other members of your team.</p>
		</SectionCard>
	{/snippet}
</Story>

<Story name="With Actions" args={{ title: 'Billing', subtitle: 'Current plan: Pro' }}>
	{#snippet template(args)}
		<SectionCard {...args}>
			<p>Your next invoice is due on the 1st of next month.</p>
			{#snippet actions()}
				<button type="button" class="btn btn-ghost btn-sm">Cancel</button>
				<button type="button" class="btn btn-primary btn-sm">Upgrade</button>
			{/snippet}
		</SectionCard>
	{/snippet}
</Story>

<Story name="Body Only">
	{#snippet template()}
		<SectionCard>
			<p>A bare card with neither title nor subtitle, just body content.</p>
		</SectionCard>
	{/snippet}
</Story>
