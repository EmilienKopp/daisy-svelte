<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Display/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
					'ghost'
				]
			},
			style: { control: 'select', options: ['solid', 'outline', 'soft', 'dash'] },
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] }
		}
	});
</script>

<Story name="Default" args={{ variant: 'primary' }}>
	{#snippet template(args)}
		<Badge {...args}>New</Badge>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex flex-wrap gap-2">
			<Badge variant="neutral">neutral</Badge>
			<Badge variant="primary">primary</Badge>
			<Badge variant="secondary">secondary</Badge>
			<Badge variant="accent">accent</Badge>
			<Badge variant="info">info</Badge>
			<Badge variant="success">success</Badge>
			<Badge variant="warning">warning</Badge>
			<Badge variant="error">error</Badge>
			<Badge variant="ghost">ghost</Badge>
		</div>
	{/snippet}
</Story>

<Story name="Styles">
	{#snippet template()}
		<div class="flex flex-wrap gap-2">
			<Badge style="solid">solid</Badge>
			<Badge style="outline">outline</Badge>
			<Badge style="soft">soft</Badge>
			<Badge style="dash">dash</Badge>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-2">
			<Badge size="xs">xs</Badge>
			<Badge size="sm">sm</Badge>
			<Badge size="md">md</Badge>
			<Badge size="lg">lg</Badge>
			<Badge size="xl">xl</Badge>
		</div>
	{/snippet}
</Story>
