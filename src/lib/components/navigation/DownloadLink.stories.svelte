<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DownloadLink from './DownloadLink.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/DownloadLink',
		component: DownloadLink,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ href: '/files/report.pdf' }}>
	{#snippet template(args)}
		<DownloadLink {...args}>Download report</DownloadLink>
	{/snippet}
</Story>

<Story name="With Filename" args={{ href: '/exports/42', filename: 'invoices-2026.csv' }}>
	{#snippet template(args)}
		<DownloadLink {...args}>Export invoices</DownloadLink>
	{/snippet}
</Story>

<Story name="Custom Styling" args={{ href: '/files/manual.pdf', class: 'btn-outline btn-secondary' }}>
	{#snippet template(args)}
		<DownloadLink {...args}>User manual (PDF)</DownloadLink>
	{/snippet}
</Story>
